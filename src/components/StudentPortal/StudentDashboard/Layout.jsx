import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <Header />
      <div className=" pt-[5rem] px-[1rem] pl-[6rem] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
