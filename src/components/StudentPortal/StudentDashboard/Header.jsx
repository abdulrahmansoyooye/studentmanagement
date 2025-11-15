// src/student-dashboard/Header.jsx
import React from "react";
import { Menu } from "lucide-react";
import logo2 from "../../assets/unilorin_logo.jpeg";

const Header = ({ onMenuToggle }) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-40 flex items-center px-4 md:px-6">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <img src={logo2} alt="Unilorin Logo" className="w-8 h-8 rounded-sm" />
        <h1 className="text-lg font-semibold tracking-wide text-gray-800">
          StudentID Management
        </h1>
      </div>

      {/* Mobile Toggle */}
      
    </header>
  );
};

export default Header;
