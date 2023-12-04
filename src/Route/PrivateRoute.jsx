import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import Spinner from "@/Shared/Spinner";
import { AuthProvider } from "@/pages/auth/Provider";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthProvider);
  if (loading) {
    return <Spinner></Spinner>;
  }
  if (user) {
    return children;
  }
  return <Navigate  to={"/sign-in"}></Navigate>;
};

export default PrivateRoute;
