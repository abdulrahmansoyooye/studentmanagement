import React, { useEffect, useState } from "react";
import IdCardDetails from "../IDcardDetails";
import axios from "axios";
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
          setData(data)
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
  }, [token,userId]);
  return (
    <div className="flex max-lg:flex-col gap-[2rem] p-[2rem_1rem]  w-full">
      <div className="sm:w-[50%] w-full">
        <div className="flex max-lg:flex-col w-full justify-between  gap-[1rem]">
          <h2 className="text-xl font-semibold ml-20">Your ID Card</h2>
        </div>
        <div className=" bg-white p-5 rounded-lg mt-2">
          <div className="flex gap-[1rem] justify-between">
            {data.status === "pending" || "revoked" ? (
              <p className="text-sm text-center p-[1rem] ml-20">
                Kindly wait for the admin to generate your Id card
              </p>
            ) : (
              <QrCodeDisplay data={data} message={message} />
            )}
          </div>
        </div>
      </div>
      <div className="w-full sm:w-[50%] ">
        <IdCardDetails message={message} data={data} />
      </div>
    </div>
  );
};
export default IdentityCards;
