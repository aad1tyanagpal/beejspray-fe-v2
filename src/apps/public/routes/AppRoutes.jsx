import { Routes, Route, Navigate, useParams } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";

import Register     from "../pages/Register";
import Login        from "../pages/Login";
import Home         from "../pages/Home";
import Cart         from "../pages/Cart";
import Checkout     from "../pages/Checkout";
import Account      from "../pages/Account";
import Orders       from "../pages/Orders";
import OrderDetail  from "../pages/OrderDetail";
import ProductDetail from "../pages/ProductDetail";
import ExplorePage  from "../pages/ExplorePage";
import ExploreLanding      from "../pages/ExploreLanding";
import TrendingPage        from "../pages/TrendingPage";
import RecentlyViewedPage  from "../pages/RecentlyViewedPage";
import Wishlist            from "../pages/WishList";
import SocialMedia         from "../pages/SocialMedia";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>

        {/* Public Routes */}
        <Route path="/"               element={<Home />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/cart"           element={<Cart />} />
        <Route path="/checkout"       element={<Checkout />} />
        <Route path="/account"        element={<Account />} />
        <Route path="/orders"         element={<Orders />} />
        <Route path="/orders/:id"     element={<OrderDetail />} />
        <Route path="/product/:id"    element={<ProductDetail />} />

        {/* ── Unified Explore Page ── */}
        {/* category: /explore/category/seeds */}
        {/* crop:     /explore/crop/tomato     */}
        {/* brand:    /explore/brand/bayer     */}
        <Route path="/wishlist"                   element={<Wishlist />} />
        <Route path="/social-media"               element={<SocialMedia />} />
        <Route path="/explore"                    element={<ExploreLanding />} />
        <Route path="/products/trending"          element={<TrendingPage />} />
        <Route path="/account/recently-viewed"   element={<RecentlyViewedPage />} />
        <Route path="/explore/:type/:slug" element={<ExplorePage />} />

        {/* Redirect old /category/:slug links so nothing breaks */}
        <Route path="/category/:slug" element={<RedirectCategory />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Account />} />
        </Route>

      </Route>
    </Routes>
  );
};

// Thin redirect component — keeps old links working
function RedirectCategory() {
  const { slug } = useParams()   // need useParams here
  return <Navigate to={`/explore/category/${slug}`} replace />
}

export default AppRoutes;