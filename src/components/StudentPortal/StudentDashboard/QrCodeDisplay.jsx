import React from "react";
import QRCode from "qrcode.react";

const QrCodeDisplay = ({ data, message }) => {
  return (
    <div className="flex flex-col gap-[2rem]  items-center w-full">
      <div className="flex flex-col gap-[1rem] justify-center items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-center">
            Download or Scan the QR Code
          </h2>
        </div>
        <img src={data} alt="" srcset="" />{" "}
      </div>
      <div className="w-full ">
        <a href={data} download={true}>
          <button
            className=" p-10 w-full bg-green-500 text-white py-2 rounded  hover:bg-green-600 focus:outline-none"
            disabled={message === "pending" ? true : false}
          >
            Download QR Code
          </button>
        </a>
      </div>
    </div>
  );
};

export default QrCodeDisplay;
