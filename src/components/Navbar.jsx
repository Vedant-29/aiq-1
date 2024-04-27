import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white p-3">
      <div className="container mx-auto flex items-center justify-between flex-wrap px-4 sm:px-5">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <Link to="/">
          <span className="font-semibold text-xl tracking-tight">Logo</span>
          </Link>
        </div>
        <div className="flex flex-row">
          {user ? (
            <Link
              to="/profile"
              className="inline-block text-sm sm:text-md px-2 sm:px-4 py-2 sm:py-3 leading-none rounded text-[#0BBD52] font-bold bg-[#E2F9E3] mt-2 sm:mt-0"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="inline-block text-sm sm:text-md px-2 sm:px-4 py-2 sm:py-3 leading-none rounded font-bold text-[#0B76BD] mt-2 sm:mt-0 mr-2 sm:mr-4"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="inline-block text-sm sm:text-md px-2 sm:px-4 py-2 sm:py-3 leading-none rounded text-[#0B76BD] font-bold bg-[#E2F1F9] mt-2 sm:mt-0 "
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;