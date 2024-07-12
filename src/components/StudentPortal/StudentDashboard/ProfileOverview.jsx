import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initialUserData } from "../../data";
import { useSession } from "../../../context/session";
const ProfileOverview = ({ userData }) => {
  const [user, setUser] = useState(initialUserData);
  const { sessionData, updateSessionData } = useSession();
  const { userId } = sessionData;
  const { token } = sessionData;
  useEffect(() => {
    (async function fetchUserData() {
      try {
        const response = await fetch(
          `https://studentbackendportal.onrender.com/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);

  return (
    <div className=" rounded-md p-8  bg-white  h-full">
      <div className="text-center mb-8 ">
        <img
          src={
            `https://studentbackendportal.onrender.com/assets/${user.photo}` ||
            "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="rounded-full w-24 h-24 mx-auto"
        />
        <h2 className="text-lg font-semibold mt-2">{user.fullName}</h2>
      </div>
      <div className="">
        <div className="text-sm text-gray-600  mb-6 flex  justify-between w-full ">
          <strong>Matric No</strong>{" "}
          <p className="text-left">{user.matricNumber}</p>
        </div>
        <div className="text-gray-600 mb-6 flex w-full  justify-between">
          <strong>Department</strong>{" "}
          <p className="text-right">{user.department}</p>
        </div>
        <div className="text-gray-600 mb-6 flex w-full  justify-between">
          <strong>Faculty</strong> <p className="text-right"> {user.faculty}</p>
        </div>
        <div className="text-gray-600 mb-6 flex w-full  justify-between">
          <strong>Level </strong> <p className="text-right">{user.level}</p>
        </div>
        <div className="text-gray-600 mb-6 flex w-full  justify-between">
          <strong>Email </strong> <p className="text-right">{user.email}</p>
        </div>
        <div className="text-gray-600 flex justify-between w-full">
          <strong>Gender </strong> <p>{user.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
