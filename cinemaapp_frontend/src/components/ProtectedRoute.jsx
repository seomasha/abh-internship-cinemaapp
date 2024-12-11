import React from "react";
import { Navigate } from "react-router-dom";
import { useNavBar } from "../context/NavBarContext";

const ProtectedRoute = ({ successComponent, allowedRoles = ["admin"] }) => {
  const { role, isLoggedIn } = useNavBar();

  if (!isLoggedIn || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return successComponent;
};

export default ProtectedRoute;
