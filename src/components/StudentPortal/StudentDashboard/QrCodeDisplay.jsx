import React from "react";
import QRCode from "qrcode.react";

const QrCodeDisplay = () => {
  const userData = {
    name: "Ajeigbe Sarat",
    matric: "20/52HL120",
    department: "Information Technology",
    faculty: "CIS",
    level: 400,
    email: "ajeigbe@gmail.com",
    phoneNumber: "+2349031239818",
  };

  const dataString = JSON.stringify(userData);

  return (
    <QRCode
      value={dataString}
      size={200}
      fgColor="#333333"
      bgColor="#ffffff"
      level="Q"
      includeMargin={true}
      renderAs="svg"
    />
  );
};

export default QrCodeDisplay;
