"use client";

import PrivateRoute from "@/components/privateRoute";
import React from "react";

const Dashboard = () => {
  return (
    <PrivateRoute>
      <div>Dashboard</div>
    </PrivateRoute>
  );
};

export default Dashboard;
