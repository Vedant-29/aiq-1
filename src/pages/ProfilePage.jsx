import React from "react";
import { useAuth } from "../hooks/auth";
import { supabase } from "../config/supabase-client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user } = useAuth();
  const { signOut } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [activeButton, setActiveButton] = useState("profile");
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchTransactions();
    }
  }, [user]);

  console.log(userProfile);

  const fetchUserProfile = async () => {
    let { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) console.error("Error fetching user profile: ", error);
    else setUserProfile(data);
  };

  // Transactions Page functions
  const fetchTransactions = async () => {
    let { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id);

    if (error) console.error("Error fetching transactions: ", error);
    else setTransactions(data);
  };

  const handleTransactionsClick = () => {
    setShowTransactions(true);
    setActiveButton("transactions");
  };

  const handleProfileClick = () => {
    setShowTransactions(false);
    setActiveButton("profile");
  };

  const handleSignOut = async () => {
    signOut();
  };
  return user ? (
    <div className="min-h-screen bg-transparent flex items-start justify-center">
      <div className="w-full max-w-6xl bg-white rounded px-4 sm:px-6 lg:px-8 py-8 lg:py-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
        <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3">
          <div className="mt-0 sm:mt-0 p-2 shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 rounded-lg">
            <div className="border-0 rounded-xl">
              <div>
                <div className="flex-col items-center w-full">
                  <div
                    onClick={handleProfileClick}
                    className={`focus:outline-none font-medium grow py-2.5 text-center rounded-sm sm:text-xs lg:text-base ${
                      activeButton === "profile"
                        ? "bg-[#EBE8FD]"
                        : "bg-transparent"
                    }`}
                  >
                    My Profile
                  </div>
                  <div
                    onClick={handleTransactionsClick}
                    className={`flex items-center justify-center focus:outline-none bg-transparent text-black px-6 px-6 lg:px-11 py-2.5 rounded-sm cursor-pointer font-medium sm:text-xs lg:text-base ${
                      activeButton === "transactions"
                        ? "bg-[#EBE8FD]"
                        : "bg-transparent"
                    }`}
                  >
                    My Transactions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-9">
          {showTransactions ? (
            // Your transactions table goes here
            <div className="mt-0 sm:mt-0 p-2.5 shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 rounded-lg min-h-52">
              <div className="mt-0">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="w-full px-3 py-3 shadow-custom-light transition-shadow duration-300 rounded-lg mt-2.5"
                  >
                    <div className="w-full px-1 flex-col items-center">
                      <div className="w-full flex items-center">
                        <div>
                        <h1 className="text-lg grow font-medium max-w-xs pr-4 sm:pr-0 sm:max-w-full">
                          {transaction.swimming_center}
                        </h1>
                        <div className="focus:outline-none bg-transparent font-normal text-sm py-1 text-start rounded mr-2">
                          <span className="font-medium">Location:</span>{" "}
                          {transaction.location_name}
                        </div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                          <div className="focus:outline-none font-medium text-xs sm:text-sm mb-2 sm:mb-0 px-3 py-1 text-center rounded-sm bg-[#EBE8FD] mr-0 sm:mr-2">
                            {transaction.plan_name}
                          </div>
                          <div
                            className={`focus:outline-none font-medium px-3 text-sm py-1 text-center rounded-sm 
                              ${
                                transaction.status === "success"
                                  ? "bg-[#D8FFE3]"
                                  : transaction.status === "failure"
                                  ? "bg-red-200"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-200"
                                  : "bg-[#EBE8FD]"
                              }`}
                          >
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex-col flex items-start text-sm mt-0">
                        
                        <div className="flex w-full justify-end mt-4 sm:mt-2">
                          <div className="focus:outline-none bg-[#E75A5A] px-3 py-1 text-white text-sm rounded-sm cursor-pointer font-medium">
                            {user ? (
                              <Link>Print Ticket</Link>
                            ) : (
                              // Replace this with your actual signup popup
                              <div onClick={() => alert("Please sign up!")}>
                                Add to Cart
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Your profile information goes here
            <div className="mt-0 sm:mt-0 p-2 shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 rounded-lg min-h-52 bg-white px-8">
              <form className="space-y-4 mt-8">
                <label className="block text-gray-800">
                  <span className="font-medium">Name:</span>
                  <input
                    type="email"
                    value={userProfile.user_name || ""}
                    readOnly
                    className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:outline-none"
                  />
                </label>
                <label className="block text-gray-800">
                  <span className="font-medium">Email:</span>
                  <input
                    type="text"
                    value={userProfile.user_email || ""}
                    readOnly
                    className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:outline-none"
                  />
                </label>
                <label className="block text-gray-800">
                  <span className="font-medium">Age:</span>
                  <input
                    type="number"
                    value={userProfile.user_age || ""}
                    readOnly
                    className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:outline-none"
                  />
                </label>
                <label className="block text-gray-800">
                  <span className="font-medium">College Name:</span>
                  <input
                    type="text"
                    value={userProfile.user_college_name || ""}
                    readOnly
                    className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:outline-none"
                  />
                </label>
                <label className="block text-gray-800">
                  <span className="font-medium">Mobile No:</span>
                  <input
                    type="tel"
                    value={userProfile.user_mobileno || ""}
                    readOnly
                    className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:outline-none"
                  />
                </label>
              </form>
              <div className="flex items-center justify-center w-full mt-10">
                <button
                  onClick={handleSignOut}
                  className="py-2 mt-4 mb-4 text-white bg-red-500 rounded-sm cursor-pointer w-32"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign In Required</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>You need to sign in to access the profile page.</p>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <button
                  onClick={redirectToSignIn}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
