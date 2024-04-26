import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PaymentPortal from "./pages/PaymentPortal";
import SignUpPopUp from "./pages/SignUpPopUp";
import SignInPopUp from "./pages/SignInPopUp";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/sign-up" element={<SignUpPopUp />} />
        <Route exact path="/sign-in" element={<SignInPopUp />} />
        <Route element={<ProtectedRoutes />}>
            <Route exact path="/payment-redirect" element={<PaymentPortal />} />
        </Route>
        <Route exact path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
