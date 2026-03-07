import { Routes, Route } from "react-router-dom";

import Profile from "../pages/Profile";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import SellerLayout from "../layout/SellerLayout";

const SellerRoutes = () => {
  return (
    <Routes>
      <Route element={<SellerLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default SellerRoutes;
