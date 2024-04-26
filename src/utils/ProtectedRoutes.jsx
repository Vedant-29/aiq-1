import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/auth"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    // user is not authenticated
    return <Navigate to="/sign-up" />
  }
  return <>{children}</>
}

export default ProtectedRoute
