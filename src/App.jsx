import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PaymentPortal from "./pages/PaymentPortal";
import SignUpPopUp from "./pages/SignUpPopUp";
import SignInPopUp from "./pages/SignInPopUp";
import RootLayout from "./components/RootLayout";
import { AuthProvider } from "./hooks/auth";
import ProtectedRoute from "./utils/ProtectedRoutes";
import UserTransactions from "./pages/UserTransactions";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RootLayout>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/sign-up" element={<SignUpPopUp />} />
            <Route exact path="/sign-in" element={<SignInPopUp />} />
            <Route
              exact
              path="/payment-redirect"
              element={<ProtectedRoute element={<PaymentPortal />} />}
            />
            <Route
              exact
              path="/transaction-details"
              element={<ProtectedRoute element={<UserTransactions />} />}
            />
            <Route
              exact
              path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
          </Routes>
        </RootLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;