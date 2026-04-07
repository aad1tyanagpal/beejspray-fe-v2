import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard  from "../pages/Dashboard";
import Inventory  from "../pages/Inventory";
import Orders     from "../pages/Orders";
import Payments   from "../pages/Payments";
import Reports    from "../pages/Reports";
import Settings   from "../pages/Settings";
import SellerLayout from "../layout/SellerLayout";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

const SellerRoutes = () => {
  return (
    <Routes>
      {/* Public — no layout, no auth */}
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected — needs auth + has SellerLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<SellerLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders"    element={<Orders />} />
          <Route path="/payments"  element={<Payments />} />
          <Route path="/reports"   element={<Reports />} />
          <Route path="/settings"  element={<Settings />} />
          <Route path="/profile"   element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default SellerRoutes;