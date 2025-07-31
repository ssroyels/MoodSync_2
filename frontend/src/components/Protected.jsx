// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If no user is found, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, allow route to load
  return children;
};

export default Protected;
