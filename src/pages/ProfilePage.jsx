import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const supabase = createClient(
  "https://lzhfsxogrzcptpmnmibi.supabase.co",
  "hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGZzeG9ncnpjcHRwbW5taWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjYyOTYsImV4cCI6MjAyOTY0MjI5Nn0.n0iXsmiQwVHwc903LjVGFGzSlVbWrnVMccQFBk7Q6eQ"
);

function ProfilePage() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error signing out: ", error.message);
    } else {
      navigate("/home");
    }
  };

  return (
    <div>
      <Navbar />
      ProfilePage
      <button
        onClick={signOut}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Sign Out
      </button>
    </div>
  );
}

export default ProfilePage;
