// src/student-dashboard/Sidebar.jsx
import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronFirst,
  ChevronLast,
  MoreVertical,
  LifeBuoy,
  LayoutDashboard,
  UserCircle,
  Edit,
  Edit3,
  LoaderPinwheel,
  Edit3Icon,
} from "lucide-react";
import logo from "../../assets/sdm2_logo.png";
import identityCardIcon from "../../assets/id-card.png";
import registrationIcon from "../../assets/contact-form.png";
import documentIcon from "../../assets/manage.png";
import notificationIcon from "../../assets/notification.png";
import { useSession } from "../../../context/session";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [logoutToggle, setLogoutToggle] = useState(true);
  const [openItem, setOpenItem] = useState(null); // State to keep track of the currently open item
  const { logout } = useSession();

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  return (
    <aside className="fixed h-[100vh] bg-white  pt-[5rem]">
      <div className="  mt-[4rem] p-4 pb-2 flex justify-between items-center ">
        <button
          onClick={handleToggle}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 "
        >
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <nav
        className={`h-full flex flex-col  justify-between  shadow-sm transition-all duration-300 `}
      >
        <SidebarContext.Provider value={{ expanded, openItem, setOpenItem }}>
          <ul className="flex-1  px-3">
            <div className="p-[0.2rem] rounded-lg ml-auto bg-gray-50">
              <SidebarItem
                icon={<LayoutDashboard size={24} />}
                text="Dashboard"
                to="/"
                id="dashboard"
                link="/"
              />
            </div>

            <SidebarItem
              icon={
                <img src={identityCardIcon} alt="Id Card" className="w-5" />
              }
              text="ID Card"
              to="/id-card"
              id="id-card"
              link="/identity-cards"
            />
            <SidebarItem
              icon={<LoaderPinwheel size={24} />}
              text="Status"
              to="/status"
              id="status"
              link="/registration-status"
            />
            <SidebarItem
              icon={<UserCircle size={24} />}
              text="Profile Overview"
              to="/profile-overview"
              id="profile"
              link="/profile-overview"
            />
            <SidebarItem
              icon={<Edit size={24} />}
              text="Edit Profile"
              to="/edit-profile"
              id="profile"
              link="/edit-profile"
            />
            <div className="relative flex border flex-col gap-[1rem]  border-t  pt-[1rem] items-center">
              <div
                className={`left-[50px] cursor-pointer absolute top-0 p-[1rem] bg-gray-50 ${
                  logoutToggle ? "hidden" : "flex"
                } rounded-md `}
                onClick={handleLogout}
              >
                Logout
              </div>
              <img
                src="#"
                alt="Profile"
                className="w-10 h-[20] cursor-pointer rounded-full bg-gray-50 p-[.5rem]"
                onClick={() => setLogoutToggle(!logoutToggle)}
              />
            </div>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, to, id, link }) {
  const { expanded, openItem, setOpenItem } = useContext(SidebarContext);
  const isOpen = openItem === id;

  const handleClick = () => {
    setOpenItem(isOpen ? null : id);
  };

  return (
    <>
      <a href={link}>
        <li
          onClick={handleClick}
          className={`flex items-center py-5 px-3 my-2 font-medium rounded-md cursor-pointer transition-colors ${
            isOpen
              ? "bg-[#000080] text-white"
              : "hover:bg-indigo-50 text-gray-600"
          }`}
        >
          <div className="icon-wrapper">{icon}</div>
          <div
            className={`ml-3 transition-all duration-300 ${
              expanded ? "block" : "hidden"
            }`}
          >
            {text}
          </div>
        </li>
      </a>
    </>
  );
}
