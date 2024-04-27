import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import { useEffect } from "react"


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();


  if (!user) {
    useEffect(() => {
      const handleBackButton = () => {
        navigate(-1);
      } 
  
      window.addEventListener('popstate', handleBackButton);
  
      return () => {
        window.removeEventListener('popstate', handleBackButton);
      };
    }, []);
    // user is not authenticated
    return <Navigate to="/sign-up" />
  }
  return <>{children}</>
}

export default ProtectedRoute
