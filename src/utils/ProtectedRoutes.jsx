import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Check if the user is not authenticated and just came from the sign-up page
  const fromSignUpPage = location.state?.fromSignUpPage;

  if (!user && !fromSignUpPage) {
    // Save the intended location before redirecting to the sign-up page
    localStorage.setItem("intendedLocation", location.pathname);
  }

  // Check if the user is not authenticated and just came from the sign-up page
  const fromProtectedRoute = location.state?.fromProtectedRoute;

  return user ? (
    element
  ) : (
    <Navigate
      to={fromProtectedRoute ? "/" : "/sign-up"}
      replace
      state={{ fromSignUpPage: true }}
    />
  );
};

export default ProtectedRoute;