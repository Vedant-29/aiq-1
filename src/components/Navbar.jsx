import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white p-3">
      <div className="container mx-auto flex items-center justify-between flex-wrap ">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <span className="font-semibold text-xl tracking-tight">Logo</span>
        </div>
        <div>
          {user ? (
            <Link
              to="/profile"
              className="inline-block text-md px-4 py-3 leading-none rounded text-[#0BBD52] font-bold bg-[#E2F9E3] mt-4 lg:mt-2"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="inline-block text-md px-4 py-3 leading-none rounded font-bold text-[#0B76BD] mt-4 lg:mt-0 mr-4"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="inline-block text-md px-4 py-3 leading-none rounded text-[#0B76BD] font-bold bg-[#E2F1F9] mt-4 lg:mt-0 "
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
