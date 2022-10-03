import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ...props }) {
  return props.isLoggingIn ? children : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
