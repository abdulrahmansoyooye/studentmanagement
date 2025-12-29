export const Avatar = ({ profileImage, fullName,sidebar }) => {
  const getInitials = (name) => {
    if (!name) return "U";

    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0) || "";
    const last = parts[1]?.charAt(0) || "";
    return (first + last).toUpperCase();
  };

  const initials = getInitials(fullName);

  // Beautiful gradient colors
  const gradient =
    "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500";

  return (
    <div className="w-24 h-24 mx-auto relative">
      {profileImage ? (
        <img
          src={profileImage}
          alt={`${fullName || "User"}'s profile`}
          className="rounded-full w-full h-full object-cover border-2 border-gray-200 shadow-md"
        />
      ) : (
        <div
          className={`rounded-full w-full h-full flex items-center justify-center text-white font-semibold text-3xl shadow-md ${gradient} `}
        >
          {initials}
        </div>
      )}
    </div>
  );
};
