// src/student-dashboard/Header.jsx
import logo2 from "../../assets/newgate_logo.jpg";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center px-4 md:px-6">
      <div className="flex items-center gap-3 pl-9 md:hidden">
        <img src={logo2} alt="Unilorin Logo" className="w-8 h-8 rounded-full" />
        <h1 className="text-lg font-semibold tracking-wide text-gray-800">
          Student Idcard Management Portal
        </h1>
      </div>

      {/* Mobile menu button */}
     
    </header>
  );
}
