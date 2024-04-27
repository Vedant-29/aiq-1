import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { NavLink, useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://lzhfsxogrzcptpmnmibi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGZzeG9ncnpjcHRwbW5taWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjYyOTYsImV4cCI6MjAyOTY0MjI5Nn0.n0iXsmiQwVHwc903LjVGFGzSlVbWrnVMccQFBk7Q6eQ"
);

function SignInPopUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rMsg, setRMsg] = useState("");
  const navigate = useNavigate();

  async function signInWithEmail(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setRMsg(error.message);
    } else {
      setRMsg("User created successfully");
      setEmail("");
      setPassword("");
      navigate("/");
    }
  }

  return (
    <main className="flex items-start justify-center min-h-screen bg-white">
      <div className="bg-transparent py-10 px-12 rounded-[12px] m-4">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-2xl font-medium">Welcome Back</h1>
          <p className="mt-1">Welcome Let's dive in.</p>
        </div>
        <form onSubmit={signInWithEmail}>
          <div className="mb-2">
            <input
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="appearance-none border min-w-72 border-[#9D9D9D] rounded w-full py-3.5 px-3.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              label="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="appearance-none border border-[#9D9D9D] rounded w-full py-3.5 px-3.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-[#E75A5A] text-white font-medium w-full py-3.5 px-3.5 rounded focus:outline-none focus:shadow-outline"
          >
            Sign in
          </button>
        
        </form>

        <p className="mt-4">
          Create an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:text-blue-700">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
    </main>
  );
}

export default SignInPopUp;
