import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    // other profile fields
  });

  useEffect(() => {
    // Simulate fetching data from backend
    const mockProfileData = {
      name: "John Doe",
      email: "john.doe@example.com",
      // other profile data
    };
    setProfileData(mockProfileData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log("Profile updated:", profileData);
  };

  return (
    <div className="edit-profile">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        </label>
        {/* other profile fields */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
