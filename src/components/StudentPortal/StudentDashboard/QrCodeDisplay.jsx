import React from "react";
import QRCode from "qrcode.react";

const QrCodeDisplay = ({ data, message }) => {
  const dataString = JSON.stringify(data);

  return (
    <div className="flex max-lg:flex-col gap-[1rem]  items-start w-full">
      <div className="flex flex-col gap-[1rem] justify-center items-center">
        <QRCode
          value={dataString}
          size={200}
          fgColor="#333333"
          bgColor="#ffff"
          level="Q"
          renderAs="jpeg"
        />{" "}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-center">
            Download or Scan the QR Code
          </h2>
        </div>
      </div>

      <div className="w-full sm:w-[50%]">
        <button
          className=" p-10 w-full bg-green-500 text-white py-2 rounded  hover:bg-green-600 focus:outline-none"
          disabled={message === "pending" ? true : false}
        >
          <a href={dataString} download={true}>
            Download
          </a>
        </button>
      </div>
    </div>
  );
};

export default QrCodeDisplay;
