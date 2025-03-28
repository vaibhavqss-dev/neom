import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
