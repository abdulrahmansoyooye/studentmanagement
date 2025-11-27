import React, { useState } from "react";
import axios from "axios";
import { useSession } from "../../context/session";

const statusStyles = {
  pending: "bg-yellow-500 text-white",
  approved: "bg-green-600 text-white",
  revoked: "bg-red-600 text-white",
  none: "bg-gray-200 text-gray-700",
};

const statusMessages = {
  pending: "Your ID card request is pending approval.",
  approved: "Your ID card has been approved.",
  revoked: "Your ID card has been revoked. You may request a new one.",
  none: "You have not requested an ID card yet.",
};

const IdCardDetails = ({  data = {} }) => {
  const [loading, setLoading] = useState(false);
  const status = data?.status
  const {
    fullName = "",
    level = "",
    matricNumber = "",
    department = "",
    email = "",
  } = data;
 const { sessionData } = useSession();
  const { userId, token } = sessionData || {};
  const alertClass = statusStyles[status];
  const alertMessage = statusMessages[status];

  const handleRequest = async () => {
    try {
      setLoading(true);
      await axios.post(
              `https://studentbackendportal.onrender.com/request/${userId}`,
              {
                qrCodeImage: JSON.stringify(data)
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
    
    window?.location?.reload()
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const showRequestButton = data.status === "none"  || data.status === "revoked";

  return (
    <div className="h-full w-full">
      <div className="bg-white p-6 w-full h-full rounded-md">
        <h2 className="text-xl font-semibold mb-4">My ID Card Details</h2>

        <div
          className={`text-center ${alertClass} p-4 rounded-md w-full my-4 transition-all duration-300`}
        >
          {alertMessage}
        </div>

        {showRequestButton && (
          <button
            onClick={handleRequest}
            disabled={loading}
            className={`px-6 py-2 mb-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50`}
          >
            {loading ? "Submitting..." : "Request ID Card"}
          </button>
        )}

        <form className="grid grid-cols-1 gap-8 max-lg:flex flex-col">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              disabled
              value={fullName}
              type="text"
              className="mt-1 w-full rounded-md p-2 border border-gray-300"
              placeholder="Your full name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField label="Level" value={level} />
            <InputField label="Matric No" value={matricNumber} />
            <InputField label="Department" value={department} />
            <InputField label="Email" value={email} type="email" />
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, value, type = "text" }) => (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      disabled
      value={value}
      type={type}
      className="mt-1 w-full rounded-md border border-gray-300 p-2"
      placeholder={`Your ${label.toLowerCase()}`}
    />
  </div>
);

export default IdCardDetails;
