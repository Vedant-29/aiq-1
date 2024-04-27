import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [backClicked, setBackClicked] = useState(false);

  useEffect(() => {
    const handleBackButton = () => {
      setBackClicked(true);
      navigate(-1);
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  if (!user && !backClicked) {
    // user is not authenticated and back button has not been clicked
    return <Navigate to="/sign-up" />;
  }
  return <>{children}</>
}

export default ProtectedRoute
