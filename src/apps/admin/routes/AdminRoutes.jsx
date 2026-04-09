import { Routes, Route } from "react-router-dom";
import Dashboard  from "../pages/Dashboard";
import Users      from "../pages/Users";
import Orders     from "../pages/Orders";
import Products   from "../pages/Products";
import Financials from "../pages/Financials";
import Marketing  from "../pages/Marketing";
import Returns    from "../pages/Returns";
import SocialFeed from "../pages/SocialFeed";
import Compliance from "../pages/Compliance";
import Reports    from "../pages/Reports";
import Analytics  from "../pages/Analytics";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/"            element={<Dashboard />} />
      <Route path="/users"       element={<Users />} />
      <Route path="/orders"      element={<Orders />} />
      <Route path="/products"    element={<Products />} />
      <Route path="/financials"  element={<Financials />} />
      <Route path="/marketing"   element={<Marketing />} />
      <Route path="/returns"     element={<Returns />} />
      <Route path="/social"      element={<SocialFeed />} />
      <Route path="/compliance"  element={<Compliance />} />
      <Route path="/reports"     element={<Reports />} />
      <Route path="/analytics"   element={<Analytics />} />
    </Routes>
  );
};

export default AdminRoutes;