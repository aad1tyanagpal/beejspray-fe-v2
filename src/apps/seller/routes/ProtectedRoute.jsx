import { Navigate,Outlet  } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  return <Outlet />;
};

export default ProtectedRoute;
