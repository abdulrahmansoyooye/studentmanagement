import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
import IdCardDetails from "../IDcardDetails";
import LatestNews from "./LatestNews";
import axios from "axios";

import { useSession } from "../../../context/session";
// import Header from "./Header";

const Dashboard = () => {
  const { sessionData } = useSession();
  const { userId } = sessionData;
  const { token } = sessionData;
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});
  useEffect(() => {
    (async function fetchUserData() {
      try {
        const response = await axios.get(
          `https://studentbackendportal.onrender.com/idcard/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.data;
        if (response.status === 202) {
          setMessage("pending");
        }
        setData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);
  return (
    <div className="w-full">
      {/* <Header /> */}
      <div className="flex max-lg:flex-col gap-[1rem] w-full ">
        <ProfileOverview />
        <IdCardDetails data={data} message={message} />
      </div>
      <LatestNews />
      <Outlet />
    </div>
  );
};

export default Dashboard;
