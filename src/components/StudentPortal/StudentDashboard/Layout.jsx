import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <Header />
      <div className="md:ml-[18rem] pt-[6rem] px-[1rem]  w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
