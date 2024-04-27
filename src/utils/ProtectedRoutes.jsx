import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = () => {
      navigate(-1);
    } 

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  if (!user) {
    // user is not authenticated
    return <Navigate to="/sign-up" />
  }
  return <>{children}</>
}

export default ProtectedRoute
