// src/DownloadIdCard.jsx
import React from "react";

const DownloadIdCard = () => {
  const handleDownload = () => {
    // Simulate downloading the ID card PDF
    console.log("Downloading ID card...");
  };

  return (
    <div className="download-id-card">
      <button onClick={handleDownload}>Download ID Card</button>
    </div>
  );
};

export default DownloadIdCard;
