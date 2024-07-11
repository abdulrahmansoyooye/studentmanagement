import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <Header />
      <div className=" p-[5rem] pr-[1rem] pl-[6rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
