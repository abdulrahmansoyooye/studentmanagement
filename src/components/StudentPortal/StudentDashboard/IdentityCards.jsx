import React, { useEffect, useState } from "react";
import IdCardDetails from "../IDcardDetails";
import { initialUserData } from "../../data.js";
import axios from "axios";
import QRCode from "./QrCodeDisplay";
import { Outlet } from "react-router-dom";
import QrCodeDisplay from "./QrCodeDisplay";
import { useSession } from "../../../context/session";

const IdentityCards = () => {
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
    <div className="flex flex-col gap-[2rem] p-[2rem_1rem]  w-full">
      <div className="w-full ">
        <div className="flex max-lg:flex-col w-full justify-between  gap-[1rem]">
          <h2 className="text-xl font-semibold">Your ID Card</h2>

          {message === "pending" && (
            <button className=" bg-[#000080] text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none">
              Request for an Id Card
            </button>
          )}
        </div>
        <div className=" bg-white p-5 rounded-lg mt-2">
          <div className="flex gap-[1rem] justify-between">
            {message !== "pending" ? (
              <QrCodeDisplay data={data} message={message} />
            ) : (
              <p className="text-sm text-center p-[1rem]">
                Request For an id Card to Generate QR Code
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full ">
        <IdCardDetails message={message} data={data} />
      </div>
    </div>
  );
};
export default IdentityCards;
