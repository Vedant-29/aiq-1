import React, { useEffect } from 'react'
import { createClient } from "@supabase/supabase-js";
import { Navigate, Outlet } from 'react-router-dom';


const supabase = createClient(
  "https://lzhfsxogrzcptpmnmibi.supabase.co",
  "hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGZzeG9ncnpjcHRwbW5taWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjYyOTYsImV4cCI6MjAyOTY0MjI5Nn0.n0iXsmiQwVHwc903LjVGFGzSlVbWrnVMccQFBk7Q6eQ"
);


function ProtectedRoutes() {
    const [user, setUser] = React.useState(null);

    
    useEffect(() => {
        const session = supabase.auth.getSession();
        setUser(session?.user);
    
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user);
          }
        );
    
        // Cleanup function
        return () => {
          authListener.subscription.unsubscribe();
        };
      }, []);

  return (
    user ? <Outlet /> : <Navigate to="/sign-up" />
  )
}

export default ProtectedRoutes