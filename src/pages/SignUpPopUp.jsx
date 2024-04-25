import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";

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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setRMsg(error.message);
    } else {
      setRMsg("User created successfully");
      setEmail("");
      setPassword("");
      navigate("/home");
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
        <p className="text-gray-500 mb-4">Join us for a wonderful experience</p>
        <form className="space-y-4" onSubmit={signUpNewUser}>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center my-4 text-gray-500">OR</p>
        <button className="w-full p-2 bg-red-500 text-white rounded">
          Sign Up with Google
        </button>
        <Link to="/sign-in" className="text-blue-500 block text-center mt-4">Login Instead</Link>
      </div>
    </div>
  );
}

export default SignUpPopUp;
