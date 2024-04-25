import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lzhfsxogrzcptpmnmibi.supabase.co",
  "hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGZzeG9ncnpjcHRwbW5taWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjYyOTYsImV4cCI6MjAyOTY0MjI5Nn0.n0iXsmiQwVHwc903LjVGFGzSlVbWrnVMccQFBk7Q6eQ"
);

function Navbar() {
    const [user, setUser] = React.useState(null)


    useEffect(() => {
        const session = supabase.auth.getSession()
        setUser(session?.user)
    
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user)
          }
        )
    
        // Cleanup function
        return () => {
          authListener.subscription.unsubscribe()
        }
      }, [])
  

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Logo</span>
      </div>    
      <div>
        {user ? (
          <Link to="/profile" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">
            Profile
          </Link>
        ) : (
          <>
            <Link to="/sign-up" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-4">
              Sign Up
            </Link>
            <Link to="/sign-in" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar