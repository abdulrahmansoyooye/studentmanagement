import React from "react";

const statusStyles = {
  pending: "bg-yellow-500 text-white",
  error: "bg-red-500 text-white",
  success: "bg-green-500 text-white",
};

const statusMessages = {
  pending: "Your ID card request is pending.",
  error: "There was an error. Please request a new ID card.",
  success: "Congratulations! Your ID card is ready.",
};

const IdCardDetails = ({ message, data = {} }) => {
  const {
    fullName = "",
    level = "",
    matricNumber = "",
    department = "",
    email = "",
  } = data;

  const alertClass = statusStyles[message];
  const alertMessage = statusMessages[message];

  return (
    <div className="h-full w-full">
      <div className="bg-white p-6 w-full h-full rounded-md">
        <h2 className="text-xl font-semibold mb-4">My ID Card Details</h2>

        {message && (
          <div
            className={`text-center ${alertClass} p-4 rounded-md w-full my-4 transition-all duration-300`}
          >
            {alertMessage}
          </div>
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
              className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
      className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
      placeholder={`Your ${label.toLowerCase()}`}
    />
  </div>
);

export default IdCardDetails;
