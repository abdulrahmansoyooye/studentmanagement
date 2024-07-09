import React from "react";
import { Outlet } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
import IdCardDetails from "../IDcardDetails";
import LatestNews from "./LatestNews";
// import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="flex max-lg:flex-col gap-[1rem] mt-[5rem] ">
        <ProfileOverview />
        <IdCardDetails />
      </div>
      <LatestNews />
      <Outlet />
    </div>
  );
};

export default Dashboard;
