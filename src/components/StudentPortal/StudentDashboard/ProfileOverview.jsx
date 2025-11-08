import React, { useEffect, useState, useRef } from "react";
import { initialUserData } from "../../data";
import { useSession } from "../../../context/session";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

const ProfileOverview = () => {
  const [user, setUser] = useState(initialUserData);
  const [loading, setLoading] = useState(true);
  const abortCtrl = useRef(null);

  const { sessionData } = useSession();
  const { userId, token } = sessionData;

  useEffect(() => {
    if (!userId || !token) return;

    abortCtrl.current = new AbortController();

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE}/users/${encodeURIComponent(userId)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: abortCtrl.current.signal,
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch user data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      if (abortCtrl.current) abortCtrl.current.abort();
    };
  }, [userId, token]);

  // ✅ fallback image
  const profileImage =
    user?.photo && user.photo !== "null"
      ? `${API_BASE}/assets/${user.photo}`
      : "https://via.placeholder.com/150";

  return (
    <div className="profile-wrapper bg-white rounded-xl shadow-sm p-6 sm:p-8 w-full max-w-md mx-auto transition-all duration-300">
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <div className="text-center mb-6">
            <img
              src={profileImage}
              alt={`${user.fullName || "User"}'s profile`}
              className="rounded-full w-24 h-24 mx-auto border-2 border-gray-200 shadow-sm object-cover"
            />
            <h2 className="text-2xl font-semibold mt-3 text-gray-800">
              {user.fullName || "Unnamed User"}
            </h2>
            <p className="text-gray-500 text-sm">Student Profile</p>
          </div>

          <div className="profile-info divide-y divide-gray-200">
            <ProfileField label="Matric No" value={user.matricNumber} />
            <ProfileField label="Department" value={user.department} />
            <ProfileField label="Faculty" value={user.faculty} />
            <ProfileField label="Level" value={user.level} />
            <ProfileField label="Email" value={user.email} />
            <ProfileField label="Gender" value={user.gender} />
          </div>
        </>
      )}
    </div>
  );
};

// ✅ Small sub-component for reusability
const ProfileField = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 text-sm text-gray-700">
    <strong className="font-medium">{label}</strong>
    <span className="text-gray-600 truncate max-w-[60%] text-right">
      {value || "—"}
    </span>
  </div>
);

// ✅ Skeleton loader for smoother UX
const ProfileSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-gray-200 w-24 h-24 mb-4"></div>
      <div className="h-4 bg-gray-200 w-32 mb-2"></div>
      <div className="h-3 bg-gray-100 w-20"></div>
    </div>
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded"></div>
      ))}
    </div>
  </div>
);

export default ProfileOverview;
