import React from "react";
import { Download, QrCode } from "lucide-react";

const QrCodeDisplay = ({ data }) => {

  const status = "approved"
  const disabled = status === "pending";

  return (
    <div className="flex flex-col items-center gap-6 w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center text-gray-800 flex items-center gap-2">
        <QrCode className="text-blue-600 w-6 h-6" /> Scan or Download Your QR Code
      </h2>

      <img
        src={data}
        alt="QR Code"
        className={`w-48 h-48 object-contain ${disabled ? "opacity-50" : ""}`}
      />

      <a href={data} download className="w-full">
        <button
          disabled={disabled}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-md transition text-white font-medium ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <Download size={18} />
          {disabled ? "Pending Approval" : "Download QR Code"}
        </button>
      </a>
    </div>
  );
};

export default QrCodeDisplay;
