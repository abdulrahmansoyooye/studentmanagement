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
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { NavLink } from "react-router-dom";
import { useSession } from "../../../context/session";
import logo from "../../assets/unilorin_logo2.png";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

export default function Sidebar({ mobileNav, setMobileNav }) {
  const { logout, sessionData } = useSession();
  const { userId, token } = sessionData || {};
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [user, setUser] = useState({});
  const abortCtrl = useRef(null);

  // Fetch User Info
  useEffect(() => {
    if (!userId || !token) return;

    abortCtrl.current?.abort();
    const controller = new AbortController();
    abortCtrl.current = controller;

    (async () => {
      try {
        const res = await fetch(
          `${API_BASE}/users/${encodeURIComponent(userId)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("Unable to fetch user data");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    })();

    return () => controller.abort();
  }, [userId, token]);

  const handleLogout = useCallback(() => {
    logout();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }, [logout]);

  return (
    <>
      {/* 🔹 Mobile Overlay */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 z-50 
          shadow-sm flex flex-col 
          transform transition-transform duration-300 
          ${mobileNav ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b bg-white">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-md" />
            <h2 className="text-lg font-semibold text-gray-900">
              Student Portal
            </h2>
          </div>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setMobileNav(false)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <X size={22} />
          </button>


          <button
        onClick={() => setMobileNav(false)}
        className="ml-auto md:hidden text-gray-700 hover:text-gray-900"
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <SidebarItem text="Dashboard" icon={<LayoutDashboard size={20} />} link="/" />
          <SidebarItem text="ID Card" icon={<Contact size={20} />} link="/identity-cards" />
          <SidebarItem text="Registration Status" icon={<Loader2 size={20} />} link="/registration-status" />
          <SidebarItem text="Profile Overview" icon={<UserCircle size={20} />} link="/profile-overview" />
          <SidebarItem text="Edit Profile" icon={<Edit size={20} />} link="/edit-profile" />
          <SidebarItem text="Help" icon={<HelpCircle size={20} />} link="/help" />
        </nav>

        {/* Footer User Box */}
        <div className="border-t px-4 py-4 bg-gray-50">
          <div
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setLogoutOpen(true)}
          >
            <img
              src={
                user?.photo
                  ? `${API_BASE}/assets/${encodeURIComponent(user.photo)}`
                  : "https://via.placeholder.com/100"
              }
              alt="User Avatar"
              className="w-11 h-11 rounded-full object-cover border"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                {user?.name || "Student"}
              </span>
              <span className="text-xs text-gray-500">{user?.matricNumber || ""}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 🔹 Logout Modal */}
      {logoutOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-5">Are you sure you want to logout?</p>

            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setLogoutOpen(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
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

function SidebarItem({ icon, text, link }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
}
