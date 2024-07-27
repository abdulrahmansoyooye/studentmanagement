import React, { useEffect, useState } from "react";
import LatestNews from "./LatestNews";
import axios from "axios";
import { useSession } from "../../../context/session";

const IdCardStatus = () => {
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
        setData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);
  return (
    <div className="">
      <div className="text-center w-full p-6 text-2xl font-semibold">
        <h2 className="text-3xl">Id Card Status</h2>
      </div>
      <div className="bg-white rounded-lg  p-4 my-6 ">
        <div className="bg-gray-100 p-8 rounded-lg mb-6 mt-10 leading-loose">
          <h2 className="text-lg font-semibold mb-2 border-b ml-20">
            Please Note
          </h2>
          <p className="leading-relaxed ml-20">
            <p> Dear Students,</p>
            Welcome to the ID Card Status Check page. Here you can track the
            progress of your ID card application.{" "}
            {/* <h3 className="font-semibold">Important information</h3>
            <p>
              If your application is under review, please revisit this page
              after 24 hours for updates.
            </p>
            <p>
              Approved ID cards can be collected from the student services
              office during working hours (Monday to Friday, 9 AM to 4PM).{" "}
            </p>
            <p>
              If you encounter any errors or discrepancies, please reach out to
              our support team at 09031239818.
            </p> */}
          </p>
        </div>
        <div className="text-center w-full p-6 text-2xl">
          <h2>Id Card Status</h2>
        </div>
        <div className="flex flex-wrap gap-[2rem] p-[2rem] justify-around items-center rounded-lg bg-gray-50">
          <div
            className={`flex flex-col cursor-pointer   gap-[1rem] justify-center items-center ${
              message === "pending" && "bg-slate-200 p-[1rem] rounded-lg"
            }`}
          >
            <div className="w-16 h-16  bg-yellow-500 rounded-[50%]"></div>
            <div className="text-lg ">Pending</div>
          </div>
          <div
            className={`flex flex-col cursor-pointer   gap-[1rem] justify-center items-center ${
              message === "success" && "bg-slate-200 p-[1rem] rounded-lg"
            }`}
          >
            <div className="w-16 h-16  bg-green-500 rounded-[50%]"></div>
            <div className="text-lg ">Ready</div>
          </div>
          <div
            className={`flex flex-col cursor-pointer   gap-[1rem] justify-center items-center ${
              message === "error" && "bg-slate-200 p-[1rem] rounded-lg"
            }`}
          >
            <div className="w-16 h-16  bg-red-500 rounded-[50%]"></div>
            <div className="text-lg ">Error</div>
          </div>
        </div>
        <div className="w-full mt-6">
          <a href="/identity-cards">
            {" "}
            <button className="blue_btn w-full">See Id Card Details</button>
          </a>
        </div>
      </div>
      <div>
        <LatestNews />
      </div>
    </div>
  );
};

export default IdCardStatus;
