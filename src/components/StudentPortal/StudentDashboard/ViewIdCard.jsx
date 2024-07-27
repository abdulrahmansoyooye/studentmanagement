// src/ViewIdCard.jsx
import React from "react";
import { idCardData } from "../../../data";

const ViewIdCard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2">
            {idCardData.studentName}'s ID Card
          </h1>
          <img
            src={idCardData.photoUrl}
            alt="Student ID Card"
            className="w-32 h-32 rounded-full mx-auto mb-2"
          />
          <p className="text-gray-600 text-sm">
            ID Number: {idCardData.matricNumber}
          </p>
          <p className="text-gray-600 text-sm">Level: {idCardData.level}</p>
          <p className="text-gray-600 text-sm">Faculty: {idCardData.faculty}</p>
          <p className="text-gray-600 text-sm">
            Department: {idCardData.department}
          </p>
          {/* Display other ID card information */}
        </div>
      </div>
    </div>
  );
};

export default ViewIdCard;
