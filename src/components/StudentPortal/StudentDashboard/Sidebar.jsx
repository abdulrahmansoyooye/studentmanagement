import {
  LayoutDashboard,
  UserCircle,
  Loader2,
  Contact,
  LogOut,
  Menu,
  Edit,
  X,
  HelpCircle,
} from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import { useSession } from "../../../context/session";
import logo from "../../assets/unilorin_logo2.png";


const API_BASE =
  process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

const SidebarContext = createContext(null);

export default function Sidebar() {
  const { logout, sessionData } = useSession();
  const { userId, token } = sessionData || {};

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [user, setUser] = useState({});
  const [mobileNav, setMobileNav] = useState(false);
  const abortCtrl = useRef(null);

  // Fetch user info
  useEffect(() => {
    if (!userId || !token) return;
    abortCtrl.current?.abort();
    const controller = new AbortController();
    abortCtrl.current = controller;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/users/${encodeURIComponent(userId)}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error("User fetch failed:", err);
      }
    })();

    return () => controller.abort();
  }, [userId, token]);

  const handleLogout = useCallback(() => {
    logout();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/auth/login";
  }, [logout]);

  const sidebarValue = useMemo(
    () => ({ openItem, setOpenItem }),
    [openItem]
  );

  return (
    <>
      {/* 🔹 Mobile Toggle Button */}
      <button
        onClick={() => setMobileNav((prev) => !prev)}
        className=" flex flex-col p-2 rounded-md bg-white shadow-md border md:hidden"
        aria-label="Toggle Navigation"
      >
        {mobileNav ? <X /> : <Menu />}
      </button>

      {/* 🔹 Mobile Overlay */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* 🔹 Sidebar Drawer */}
      <aside
        className={`fixed md:relative top-0 left-0 min-h-screen bg-white border-r border-gray-200 z-40
        transition-transform duration-300 ease-in-out w-72 flex flex-col
        ${mobileNav ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <img src={logo} alt="University Logo" className="w-9 h-9 rounded-full" />
            <h2 className="text-lg font-semibold text-[#000080] tracking-tight">
              Student Portal
            </h2>
          </div>
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 transition"
            onClick={() => setMobileNav(false)}
          >
            <X size={22} />
          </button>
        </div>

        <SidebarContext.Provider value={sidebarValue}>
          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" link="/" id="dashboard" />
            <SidebarItem icon={<Contact size={20} />} text="ID Card" link="/identity-cards" id="id-card" />
            <SidebarItem icon={<Loader2 size={20} />} text="Registration Status" link="/registration-status" id="status" />
            <SidebarItem icon={<UserCircle size={20} />} text="Profile Overview" link="/profile-overview" id="profile-overview" />
            <SidebarItem icon={<Edit size={20} />} text="Edit Profile" link="/edit-profile" id="edit-profile" />
            <SidebarItem icon={<HelpCircle size={20} />} text="Help" link="/help" id="help" />
          </nav>

          {/* Footer / User Info */}
          <div className="border-t px-4 py-4 bg-gray-50 flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition"
              onClick={() => setLogoutOpen(true)}
            >
              <img
                src={
                  user?.photo
                    ? `${API_BASE}/assets/${encodeURIComponent(user.photo)}`
                    : "https://via.placeholder.com/100"
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-gray-800 truncate">
                  {user?.name || user?.fullName || "Student"}
                </span>
                <span className="text-gray-500 text-xs truncate">
                  {user?.matricNumber || ""}
                </span>
              </div>
            </div>
          </div>
        </SidebarContext.Provider>
      </aside>

      {/* 🔹 Logout Modal */}
      {logoutOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <img
              src={
                user?.photo
                  ? `${API_BASE}/assets/${encodeURIComponent(user.photo)}`
                  : "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {user?.name || "Student"}
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
              <button
                onClick={() => setLogoutOpen(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SidebarItem({ icon, text, link, id }: any) {
  const ctx = useContext(SidebarContext);
  if (!ctx) return null;
  const { openItem, setOpenItem } = ctx;
  const isOpen = openItem === id;

  const handleClick = () => setOpenItem(isOpen ? null : id);

  return (
    <NavLink
      to={link}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group 
         ${
           isActive
             ? "bg-gradient-to-r from-[#000080] to-blue-600 text-white shadow-md"
             : "hover:bg-blue-50 hover:text-[#000080] text-gray-700"
         }`
      }
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </NavLink>
  );
}
