import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store";

const ProtectedRoute: React.FC = () => {
  const { auth } = useStore((state) => ({
    auth: state.auth,
  }));

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
