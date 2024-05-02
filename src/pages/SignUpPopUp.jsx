import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const supabase = createClient(
  "https://lzhfsxogrzcptpmnmibi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGZzeG9ncnpjcHRwbW5taWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjYyOTYsImV4cCI6MjAyOTY0MjI5Nn0.n0iXsmiQwVHwc903LjVGFGzSlVbWrnVMccQFBk7Q6eQ"
);

function SignUpPopUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rMsg, setRMsg] = useState("");
  const navigate = useNavigate();

  async function signUpNewUser(e) {
    e.preventDefault();
    const { data : signUpData, error: signUpError} = await supabase.auth.signUp({
      email,
      password,
    });
    


    if (signUpError) {
      setRMsg(signUpError.message);
    } else {
      setRMsg("User created successfully");
      

      const userId = signUpData.user.id;
      const emailId = signUpData.user.email;

      const { data : insertData, error : insertError } = await supabase.from("user_profiles").insert([
        {
          id: userId,
          user_email: emailId
        }
      ]);  

      if (insertError) {
        setRMsg(insertError.message);
      } else {
        setRMsg("User created successfully");
        setEmail("");
        setPassword("");
        navigate("/");
      }

    }

    
  }

  return (
    <main className="flex items-start justify-center min-h-screen bg-white">
      <div className="bg-transparent py-10 px-12 rounded-[12px] m-4">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-2xl font-medium">Create an account</h1>
          <p className="mt-1">Let's get started</p>
        </div>
        <form onSubmit={signUpNewUser}>
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
            Sign up
          </button>
        
        </form>

        <p className="mt-4">
          Already have an account?{" "}
          <NavLink to="/sign-in" className="text-blue-500 hover:text-blue-700">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
    </main>
  );
}

export default SignUpPopUp;
