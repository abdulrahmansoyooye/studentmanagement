import React, { useState, useEffect } from "react";
import { useSession } from "../../../context/session";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    faculty: "",
    matricNumber: "",
    level: "",
    department: "",
  });
  const { fullName, email, faculty, matricNumber, level, department } = user;
  const { sessionData,  } = useSession();
  const [errors, setErrors] = useState(false);

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
  }, [token,userId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://studentbackendportal.onrender.com/users/edit/${userId}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/profile-overview");
      }
    } catch (error) {
      setErrors(`${error.response.data.message} Please try again`);
    }
  };

  return (
    <div className=" rounded-md p-8  bg-white  h-full">
      <div className="w-full ">
        <h2 className="text-xl font-semibold mb-4">
          Edit Your Profile Details
        </h2>
        {<p className="text-red-500 text-center w-full my-4"> {errors}</p>}

        <form
          className="grid grid-cols-1 gap-[2rem] max-lg:flex flex-col "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-[1rem]">
            <label className=" text-sm font-medium text-gray-700 ">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={handleChange}
              name="fullName"
              className="mt-1  w-full rounded-md p-2 border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Level
              </label>
              <input
                onChange={handleChange}
                value={level}
                name="level"
                type="text"
                className="mt-1  w-full rounded-md border-gray-300 border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter level"
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Matric No
              </label>
              <input
                onChange={handleChange}
                value={matricNumber}
                name="matricNumber"
                className="mt-1  w-full rounded-md p-2 border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your matric number"
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Faculty
              </label>
              <input
                onChange={handleChange}
                value={faculty}
                name="faculty"
                type="text"
                className="mt-1  w-full rounded-md border-gray-300 p-2 border focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Email
              </label>
              <input
                onChange={handleChange}
                value={email}
                name="email"
                className="mt-1  w-full rounded-md border-gray-300 border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label className=" text-sm font-medium text-gray-700 ">
                Department
              </label>
              <input
                onChange={handleChange}
                value={department}
                name="department"
                className="mt-1  w-full rounded-md border-gray-300 border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
          >
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
