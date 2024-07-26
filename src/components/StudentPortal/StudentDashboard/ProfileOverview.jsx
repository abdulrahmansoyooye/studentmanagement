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
    <div className="profile-wrapper profile-wrapper_now rounded-md p-8  bg-white  h-full">
      <div className="profile-container text-center mb-8 ">
        <img
          src={
            `https://studentbackendportal.onrender.com/assets/${user.photo}` ||
            "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="rounded-full w-24 h-24 mx-auto border-2 border-gray-200 shadow-sm"
        />
        <h2 className="text-3xl font-semibold mt-2">{user.fullName}</h2>
      </div>
      <div className="profile-info">
        <div className="text-sm  text-gray-600  mb-2 flex  justify-between flex-col gap-[1rem] w-full border-b py-2 ">
          <strong>Matric No</strong>{" "}
          <p className="text-left flex justify-end">{user.matricNumber}</p>
        </div>
        <div className="text-sm  text-gray-600  mb-2 flex  justify-between flex-col gap-[1rem] w-full border-b py-2">
          <strong>Department</strong>{" "}
          <p className="text-left flex justify-end">{user.department}</p>
        </div>
        <div className="text-sm  text-gray-600  mb-2 flex  justify-between flex-col gap-[1rem] w-full border-b py-2">
          <strong>Faculty</strong>{" "}
          <p className="text-left flex justify-end"> {user.faculty}</p>
        </div>
        <div className="text-sm  text-gray-600  mb-2 flex  justify-between flex-col gap-[1rem] w-full border-b py-2 ">
          <strong>Level </strong>{" "}
          <p className="text-left flex justify-end">{user.level}</p>
        </div>
        <div className="text-sm  text-gray-600  mb-2 flex  justify-between flex-col gap-[1rem] w-full border-b py-2">
          <strong>Email </strong>{" "}
          <p className="text-left flex justify-end">{user.email}</p>
        </div>
        <div className="text-sm text-gray-600  mb-2 flex  justify-between flex-col gap-[1rem] w-full ">
          <strong>Gender </strong>{" "}
          <p className="text-left flex justify-end">{user.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
