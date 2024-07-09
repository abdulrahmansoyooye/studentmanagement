import React from "react";
import IdCardDetails from "../IDcardDetails";
import QRCode from "./QrCodeDisplay";
import { Outlet } from "react-router-dom";
import QrCodeDisplay from "./QrCodeDisplay";

const IdentityCards = () => {
  return (
    <div className="flex flex-col gap-[2rem] p-[2rem_1rem]">
      <div className="flex max-lg:flex-col justify-between  gap-[1rem]">
        <h2 className="text-xl font-semibold">Your ID Card</h2>
        <button className="bg-[#000080] text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none">
          Request a new One
        </button>
      </div>
      <div className=" bg-white p-5 rounded-lg flex max-lg:flex-col mt-2 gap-[1rem] justify-between">
        <div className="flex  max-lg:flex-col">
          <QrCodeDisplay />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">
              Download or Scan the QR Code
            </h2>
            <p>Student</p>
          </div>
        </div>
        <div className="">
          <button className=" p-10 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none">
            Download
          </button>
        </div>
      </div>

      <div className=" ">
        <IdCardDetails />
      </div>
    </div>
  );
};
export default IdentityCards;
