import React, { useEffect, useState } from "react";
import { useSession } from "../../context/session";

const IdCardDetails = () => {
  const { sessionData } = useSession();
  const { userId } = sessionData;
  const { token } = sessionData;
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async function fetchUserData() {
      try {
        const response = await fetch(
          `https://studentbackendportal.onrender.com/idcard/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setMessage(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);
  return (
    <div className="h-full w-full">
      <div className=" bg-white p-6 w-full h-full rounded-md">
        <h2 className="text-xl font-semibold mb-4">My ID Card Details</h2>
        <div
          className={`${
            message === "Your Id Card is Pending" && "bg-yellow-400"
          } text-center  text-slate-800 p-[1rem] rounded-md w-full my-4`}
        >
          {" "}
          {message}
        </div>

        <form className="grid grid-cols-1 gap-[2rem] max-lg:flex flex-col ">
          <div className="flex flex-col gap-[1rem]">
            <label className=" text-sm font-medium text-gray-700 ">
              Full Name
            </label>
            <input
              disabled={true}
              type="text"
              className="mt-1  w-full rounded-md p-2 border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500"
              placeholder=" Your full name"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Level
              </label>
              <input
                disabled={true}
                type="text"
                className="mt-1  w-full rounded-md border-gray-300 border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder=" Your Level"
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Matric No
              </label>
              <input
                disabled={true}
                type="email"
                className="mt-1  w-full rounded-md p-2 border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500"
                placeholder=" Your matric number"
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Phone Number
              </label>
              <input
                disabled={true}
                type="text"
                className="mt-1  w-full rounded-md border-gray-300 p-2 border focus:border-indigo-500 focus:ring-indigo-500"
                placeholder=" Your phone number"
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Email
              </label>
              <input
                disabled={true}
                type="email"
                className="mt-1  w-full rounded-md border-gray-300 border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder=" Your email"
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
          >
            Scan QR Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default IdCardDetails;
