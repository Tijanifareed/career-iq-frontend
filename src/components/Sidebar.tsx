// components/Sidebar.tsx
import React from "react";
import {
  FaHome,
  FaListAlt,
  FaFileAlt,
  FaComments,
  FaStream,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  { id: "applications", label: "Applications", icon: <FaListAlt />, path: "/applications" },
  { id: "resume", label: "AI Resume Feedback", icon: <FaFileAlt />, path: "/resume" },
  { id: "interview", label: "Interview Prep", icon: <FaComments />, path: "/interview" },
  // { id: "timeline", label: "Timeline", icon: <FaStream />, path: "/timeline" },
  { id: "profile", label: "Profile", icon: <FaUser />, path: "/profile" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // 🔴 Clear token/session (adjust as needed)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex md:flex-col justify-between w-64 h-screen bg-white border-r border-gray-200 p-4">
      {/* NAV LINKS */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-gray-100 transition ${
                active ? "bg-gray-100 font-semibold font-inter" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* LOGOUT + BRAND */}
      <div className="flex flex-col gap-4">
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

        {/* Logo + branding */}
        <div className="flex flex-col items-center text-center mt-2">
          {/* Icon + text same line */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png" // ✅ Update with your logo path
              alt="CareerIQ Logo"
              className="w-8 h-8"
            />
            <span className="text-base font-bold font-inter italic text-customBlue">CareerIQ</span>
          </div>
          {/* Small tagline */}
          <span className="text-xs text-gray-500 mt-1">
            Smarter job search
          </span>
        </div>
      </div>
    </aside>
  );
}

