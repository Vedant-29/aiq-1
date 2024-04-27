import React from "react";
import { useAuth } from "../hooks/auth";
import { supabase } from "../config/supabase-client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function ProfilePage() {
  const { user } = useAuth();
  const { signOut } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1024 });

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    let { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id);

    if (error) console.error("Error fetching transactions: ", error);
    else setTransactions(data);
  };

  const handleLogout = () => {
    signOut();
  };

  return user ? (
    isDesktopOrLaptop ? (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="w-full max-w-5xl p-8 bg-white rounded shadow mt-20">
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Profile Page
        </h1>
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Center
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.location_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.swimming_center}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.plan_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 mt-8 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign Out
        </button>
      </div>
    </div>
    ) : (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center">
        <div className="w-full max-w-md mt-20 mx-5 p-8 bg-white rounded shadow text-center">
          <h1 className="text-2xl font-normal mb-8">Page not available for mobile, use laptop instead</h1>
        </div>
      </div>
    )
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
