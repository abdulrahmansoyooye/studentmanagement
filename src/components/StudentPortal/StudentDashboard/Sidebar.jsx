// src/student-dashboard/Sidebar.jsx
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
import logo from "../../assets/sdm2_logo.png";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

const SidebarContext = createContext(null);

export default function Sidebar() {
  const { logout, sessionData } = useSession();
  const { userId, token } = sessionData || {};

  const [expanded, setExpanded] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [user, setUser] = useState({});
  const [mobileNav, setMobileNav] = useState(false);
  const abortCtrl = useRef(null);

  // ✅ Fetch user data securely
  useEffect(() => {
    if (!userId || !token) return;
    abortCtrl.current?.abort();
    const controller = new AbortController();
    abortCtrl.current = controller;

    const fetchUserData = async () => {
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
    };

    fetchUserData();
    return () => controller.abort();
  }, [userId, token]);

  // ✅ Logout confirmation flow
  const handleLogout = useCallback(() => {
    logout();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/auth/login";
  }, [logout]);

  const sidebarValue = useMemo(
    () => ({ expanded, openItem, setOpenItem }),
    [expanded, openItem]
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileNav((prev) => !prev)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden"
        aria-label="Toggle Navigation"
      >
        {mobileNav ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg border-r z-40 transition-transform duration-300 
          ${mobileNav ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 w-72`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-3">
            <img src={logo} alt="University Logo" className="w-10 h-10" />
            <h2 className="text-xl font-semibold text-[#000080]">Student Portal</h2>
          </div>
        </div>

        {/* Navigation */}
        <SidebarContext.Provider value={sidebarValue}>
          <nav className="flex flex-col justify-between h-full">
            <ul className="flex-1 overflow-y-auto px-3 py-5 space-y-2">
              <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" link="/" id="dashboard" />
              <SidebarItem icon={<Contact size={20} />} text="ID Card" link="/id-card" id="id-card" />
              <SidebarItem icon={<Loader2 size={20} />} text="Registration Status" link="/registration-status" id="status" />
              <SidebarItem icon={<UserCircle size={20} />} text="Profile Overview" link="/profile-overview" id="profile-overview" />
              <SidebarItem icon={<Edit size={20} />} text="Edit Profile" link="/edit-profile" id="edit-profile" />
              <SidebarItem icon={<HelpCircle size={20} />} text="Help" link="/help" id="help" />
            </ul>

            {/* Footer */}
            <div className="border-t px-4 py-3 flex items-center justify-between relative">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLogoutOpen((prev) => !prev)}>
                <img
                  src={
                    user?.photo
                      ? `${API_BASE}/assets/${encodeURIComponent(user.photo)}`
                      : "https://via.placeholder.com/150"
                  }
                  alt="Student Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-medium text-gray-800 truncate">{user?.name || user?.fullName || "Student"}</span>
                  <span className="text-gray-500 text-xs truncate">{user?.matricNumber || ""}</span>
                </div>
              </div>

              {/* Logout Dropdown */}
              {logoutOpen && (
                <div className="absolute bottom-16 left-4 right-4 bg-white border rounded-md shadow-lg p-3 animate-fade-in">
                  <p className="text-sm text-gray-700 mb-3 text-center">Are you sure you want to logout?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLogout}
                      className="w-1/2 py-1.5 text-white bg-red-600 hover:bg-red-700 rounded-md text-sm transition"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setLogoutOpen(false)}
                      className="w-1/2 py-1.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </SidebarContext.Provider>
      </aside>
    </>
  );
}

function SidebarItem({ icon, text, link, id }) {
  const ctx = useContext(SidebarContext);
  if (!ctx) return null;
  const { expanded, openItem, setOpenItem } = ctx;
  const isOpen = openItem === id;

  const handleClick = () => setOpenItem(isOpen ? null : id);

  return (
    <NavLink
      to={link}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-[#000080] text-white"
            : "hover:bg-blue-50 text-gray-700"
        }`
      }
    >
      {icon}
      {expanded && <span className="text-sm font-medium">{text}</span>}
    </NavLink>
  );
}
