import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { supabase } from "../config/supabase-client";
import Modal from "react-modal";
import { useState } from "react";

function PaymentPortal() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { locationNameOut, planOut, swimmingCentresOut } = location.state;
  const [popupVisible, setPopupVisible] = useState(false);

  console.log(user);

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (popupVisible) {
      fetchUserProfile();
    }
  }, [popupVisible]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select()
        .eq("id", user.id)
        .single();

      if (error) {
        throw error;
      }

      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update(userProfile)
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      const userDetailsComplete = await checkUserDetails(user.id);

      if (userDetailsComplete) {
        createTransaction(
          user.id,
          locationNameOut,
          swimmingCentresOut,
          planOut,
          "success"
        );
      }

      handlePopupClose();
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

  const checkUserDetails = async (user) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select()
        .eq("id", user)
        .single();

      if (error) {
        throw error;
      }

      // Check if any field is null
      const userDetailsComplete = Object.values(data).every(
        (value) => value !== null
      );

      if (!userDetailsComplete) {
        setPopupVisible(true);
      }

      return userDetailsComplete;
    } catch (error) {
      console.error("Error checking user details:", error.message);
      return false;
    }
  };

  const createTransaction = async (
    user,
    location,
    swimmingCenter,
    plan,
    msg
  ) => {
    const userDetailsComplete = await checkUserDetails(user);

    if (!userDetailsComplete) {
      return null;
    }

    const { data, error } = await supabase.from("transactions").insert({
      user_id: user,
      location_name: location,
      swimming_center: swimmingCenter,
      plan_name: plan,
      status: msg,
    });

    if (error) {
      console.error("Error inserting transaction:", error.message);
      return null;
    } else {
      navigate("/profile");
    }

    return data;
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Payment Portal</h1>
        <p className="mb-2">
          <span className="font-bold">Plan:</span> {planOut}
        </p>
        <p className="mb-2">
          <span className="font-bold">Location:</span> {locationNameOut}
        </p>
        <p className="mb-4">
          <span className="font-bold">Swimming Center:</span>{" "}
          {swimmingCentresOut}
        </p>
        <button
          onClick={() =>
            createTransaction(
              user.id,
              locationNameOut,
              swimmingCentresOut,
              planOut,
              "failure"
            )
          }
          className="w-full py-2 mb-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Failure
        </button>
        <button
          onClick={() =>
            createTransaction(
              user.id,
              locationNameOut,
              swimmingCentresOut,
              planOut,
              "success"
            )
          }
          className="w-full py-2 mb-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Success
        </button>
        <button
          onClick={() =>
            createTransaction(
              user.id,
              locationNameOut,
              swimmingCentresOut,
              planOut,
              "pending"
            )
          }
          className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Pending
        </button>
      </div>
      <Modal
        isOpen={popupVisible}
        onRequestClose={handlePopupClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "4px",
            width: "80%",
            maxWidth: "500px",
          },
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={userProfile.user_name || ""}
              onChange={(e) =>
                setUserProfile({ ...userProfile, user_name: e.target.value })
              }
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              value={userProfile.user_age || ""}
              onChange={(e) =>
                setUserProfile({ ...userProfile, user_age: e.target.value })
              }
            />
          </label>
          <label>
            College Name:
            <input
              type="text"
              value={userProfile.user_college_name || ""}
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  user_college_name: e.target.value,
                })
              }
            />
          </label>
          <label>
            College Name:
            <input
              type="text"
              value={userProfile.user_mobileno || ""}
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  user_mobileno: e.target.value,
                })
              }
            />
          </label>
          {/* Add more fields as needed */}
          <button type="submit">Submit</button>
        </form>
        <button onClick={handlePopupClose}>Close</button>
      </Modal>
    </div>
  );
}

export default PaymentPortal;
