import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div style={{ flex: 1, padding: "10px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
