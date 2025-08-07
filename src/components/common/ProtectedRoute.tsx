import { useAuthContext } from "@/contexts/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
