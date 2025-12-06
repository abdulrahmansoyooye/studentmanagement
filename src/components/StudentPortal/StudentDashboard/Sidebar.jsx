// components/Layout/Sidebar.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  UserCircle,
  Loader2,
  Contact,
  Menu,
  Edit,
  X,
  HelpCircle,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../../../context/session";
import logo from "../../assets/NewGate_logo_III.png";
import { Avatar } from "./Avatar";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://studentbackendportal.onrender.com";

export function Header({ mobileNav, setMobileNav }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center px-4 md:px-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Unilorin Logo" className="w-8 h-8 rounded-sm" />
        <h1 className="text-lg font-semibold tracking-wide text-gray-800">
          StudentID Management
        </h1>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileNav(!mobileNav)}
        aria-label={mobileNav ? "Close menu" : "Open menu"}
        aria-expanded={mobileNav}
        aria-controls="sidebar"
        className="ml-auto md:hidden p-2 rounded-md bg-white shadow text-gray-700 hover:text-gray-900"
      >
        {mobileNav ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}

/**
 * Default Sidebar component
 * Props:
 *   - mobileNav: boolean (controls mobile visibility)
 *   - setMobileNav: function to toggle
 */
export default function Sidebar() {
  const { logout, sessionData } = useSession();
  const { userId, token } = sessionData || {};
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [user, setUser] = useState({});
  const [mobileNav, setMobileNav] = useState(false);
 
  const isMounted = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile nav when route changes (common mobile behaviour)
  useEffect(() => {
    setMobileNav(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
   

    (async () => {
      try {
        const res = await fetch(
          `${API_BASE}/users/${encodeURIComponent(userId)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            
          }
        );
        if (!res.ok) throw new Error("Unable to fetch user data");
        const data = await res.json();
        if (isMounted.current) setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    })();

   
  }, [userId, token]);

  // lock body scroll when mobile nav open
  useEffect(() => {
    if (mobileNav) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
  }, [mobileNav]);

  // handle escape key to close overlays/modals
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (logoutOpen) setLogoutOpen(false);
        if (mobileNav) setMobileNav(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [logoutOpen, mobileNav, setMobileNav]);

  /** Logout Handler */
  const handleLogout = useCallback(() => {
    // best practice: let context/auth provider handle clearing auth tokens.
    try {
      logout(); // your context function
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      // fallback: clear storage and navigate to login
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    }
  }, [logout, navigate]);

  return (
    <>
      {/* Overlay (mobile only) */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileNav(false)}
          aria-hidden
        />
      )}
      <div className="fixed z-50 top-3 left-2">
 <button
        onClick={() => setMobileNav(!mobileNav)}
        aria-label={mobileNav ? "Close menu" : "Open menu"}
        aria-expanded={mobileNav}
        aria-controls="sidebar"
        className="ml-auto md:hidden p-2 rounded-md bg-white  text-gray-700 hover:text-gray-900"
      >
        {mobileNav ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      </div>
      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 z-50 shadow-sm flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${mobileNav ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-hidden={!mobileNav && window.innerWidth < 768}
      >
        {/* Header area inside sidebar (visible on md+ as extra branding or can be removed) */}
        <div className="hidden md:flex items-center justify-between px-5 h-16 border-b bg-white">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-md" />
            <h2 className="text-lg font-semibold text-gray-900">
              IdCard Portal
            </h2>
          </div>
        </div>

        {/* Close button rendered inside sidebar header for mobile */}
        <div className="md:hidden flex items-center justify-between px-4 h-14 border-b">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-md" />
            <h2 className="text-sm font-medium text-gray-900">Student Portal</h2>
          </div>

          <button
            onClick={() => setMobileNav(false)}
            className="p-2 rounded-md text-gray-700 hover:text-gray-900"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5" aria-label="Main navigation">
          <SidebarItem text="Dashboard" icon={<LayoutDashboard size={18} />} link="/" />
          <SidebarItem text="ID Card" icon={<Contact size={18} />} link="/identity-cards" />
          <SidebarItem text="Registration Status" icon={<Loader2 size={18} />} link="/registration-status" />
          <SidebarItem text="Profile Overview" icon={<UserCircle size={18} />} link="/profile-overview" />
          <SidebarItem text="Edit Profile" icon={<Edit size={18} />} link="/edit-profile" />
          <SidebarItem text="Help" icon={<HelpCircle size={18} />} link="/help" />
        </nav>

        {/* Footer User Box */}
        <div className="border-t px-4 py-4 bg-gray-50">
          <button
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-left"
            aria-haspopup="dialog"
            aria-controls="logout-modal"
          >
          <Avatar profileImage={user.photo} fullName={user.fullName}/>
          
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{user?.name || "Student"}</div>
              <div className="text-xs text-gray-500">{user?.matricNumber || ""}</div>
            </div>
            {/* small chevron or logout icon could go here */}
          </button>
        </div>
      </aside>

      {/* Mobile menu button (for users who don't render Header) - hidden by default if Header is used */}
      {/* If you already place Header in layout, you can remove this button. */}
      <button
        onClick={() => setMobileNav(true)}
        className="fixed top-4 left-4 z-30 md:hidden p-2 bg-white rounded-md shadow text-gray-700 hover:text-gray-900"
        aria-label="Open Menu"
      >
        <Menu size={20} />
      </button>

      {/* Logout Modal */}
      {logoutOpen && (
        <LogoutModal
          id="logout-modal"
          onClose={() => setLogoutOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}

/** Reusable Sidebar Item */
function SidebarItem({ icon, text, link }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
        ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`
      }
    >
      <span className="shrink-0 text-gray-600">{icon}</span>
      <span className="truncate">{text}</span>
    </NavLink>
  );
}

/** Small Logout modal component with basic focus & accessibility */
function LogoutModal({ id = "logout-modal", onClose, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    // autofocus cancel for keyboard users (basic focus management)
    cancelRef.current?.focus();
  }, []);

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Confirm Logout</h3>
        <p className="text-gray-600 mb-5">Are you sure you want to logout?</p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Logout
          </button>
          <button
            ref={cancelRef}
            onClick={onClose}
            className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
