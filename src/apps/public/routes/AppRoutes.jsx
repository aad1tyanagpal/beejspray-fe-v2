import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Account";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Account from "../pages/Account";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import ProductDetail from "../pages/ProductDetail";
import CategoryPage from "../pages/CategoryPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route element={<PublicLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
