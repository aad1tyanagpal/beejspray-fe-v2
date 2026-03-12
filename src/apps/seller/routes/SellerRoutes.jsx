import { BrowserRouter, Routes, Route } from "react-router-dom";

import Profile from "../pages/Profile";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import SellerLayout from "../layout/SellerLayout";

const SellerRoutes = () => {
  const base = import.meta.env.BASE_URL || '/';
  return (
    <BrowserRouter basename={base}>
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
    </BrowserRouter>
  );
};

export default SellerRoutes;
