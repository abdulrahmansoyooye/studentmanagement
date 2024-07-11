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
} from "lucide-react";
import logo from "../../assets/sdm2_logo.png";
import identityCardIcon from "../../assets/id-card.png";
import registrationIcon from "../../assets/contact-form.png";
import documentIcon from "../../assets/manage.png";
import notificationIcon from "../../assets/notification.png";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [openItem, setOpenItem] = useState(null); // State to keep track of the currently open item

  const handleToggle = () => {
    setExpanded(!expanded);
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
              icon={<Edit3 size={24} />}
              text="Edit Profile"
              to="/edit-profile"
              id="profile"
              link="/edit-profile"
            />
          </ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3 items-center">
          <img src="#" alt="Profile" className="w-10 h-10 rounded-full" />
          <div
            className={`flex flex-col ml-3 transition-all duration-300 ${
              expanded ? "block" : "hidden"
            }`}
          >
            <h4 className="font-semibold">Unilorin</h4>
            <span className="text-xs text-gray-600">ID Management</span>
          </div>
          <MoreVertical size={20} className="ml-auto" />
        </div>
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
