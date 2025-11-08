import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
import IdCardDetails from "../IDcardDetails";
import LatestNews from "./LatestNews";
import axios from "axios";
import { useSession } from "../../../context/session";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { sessionData } = useSession();
  const { userId, token } = sessionData || {};

  const [message, setMessage] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !token) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://studentbackendportal.onrender.com/idcard/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const fetchedData = response.data;
        if (response.status === 202) setMessage("pending");
        else if (response.status === 200) {
          setMessage("success");
          setData(fetchedData);
        } else setMessage("error");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setMessage("error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <Loader2 className="animate-spin text-[#000080]" size={40} />
        <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
      </div>
    );

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 p-4 bg-gray-50">
      {/* Page Header */}
      <header className="bg-white shadow-sm border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#000080]">Welcome Back 👋</h1>
          <p className="text-gray-500 text-sm">
            Manage your student activities, ID card, and updates at a glance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#000080] text-white px-4 py-2 rounded-xl text-sm shadow-sm">
            {message === "pending" && "ID Request Pending"}
            {message === "success" && "ID Card Active"}
            {message === "error" && "No ID Card Found"}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        className="
          grid 
          grid-cols-1 
          lg:grid-cols-[1.2fr_2fr]
          xl:grid-cols-[1fr_2fr]
          gap-6
          w-full
          items-start
        "
      >
        {/* Profile Overview Card */}
        <section className="w-full bg-white shadow-sm border rounded-2xl p-4">
          <ProfileOverview />
        </section>

        {/* ID Card Details Card */}
        <section className="w-full bg-white shadow-sm border rounded-2xl p-4">
          <IdCardDetails data={data} message={message} />
        </section>
      </main>

      {/* Latest News Section */}
      <section className="w-full bg-white shadow-sm border rounded-2xl p-4">
        <LatestNews />
      </section>

      {/* Nested Routed Content */}
      <section className="w-full">
        <Outlet />
      </section>
    </div>
  );
};

export default Dashboard;
