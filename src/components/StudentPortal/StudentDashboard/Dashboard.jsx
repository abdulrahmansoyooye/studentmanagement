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
        } else if (response.status === 200) {
          setMessage("success");
          setData(data);
        } else {
          setMessage("error");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);
  return (
   <div className="w-full min-h-screen flex flex-col gap-6 p-4">
  {/* Header */}
 

  {/* Main Content Area */}
  <main
    className="
      grid 
      grid-cols-1 
      lg:grid-cols-[1fr_2fr] 
      gap-6 
      w-full
      items-start
    "
  >
    {/* Profile Overview */}
    <section className="w-full">
      <ProfileOverview />
    </section>

    {/* ID Card Details */}
    <section className="w-full">
      <IdCardDetails data={data} message={message} />
    </section>
  </main>

  {/* Latest News Section */}
  <section className="w-full">
    <LatestNews />
  </section>

  {/* Dynamic Routed Content */}
  <section className="w-full">
    <Outlet />
  </section>
</div>

  );
};

export default Dashboard;
