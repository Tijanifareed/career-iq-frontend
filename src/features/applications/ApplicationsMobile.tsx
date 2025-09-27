import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaHome, FaFileAlt, FaRobot, FaComments, FaPlus, FaUser } from "react-icons/fa";
import { useApplications } from "../../queries/applications";
import ApplicationsFilter from "../../components/ApplicationsFilter";
import ApplicationCardMobile from "../../components/ApplicationCardMobile";
import Ticker from "../../components/TickerComponent";

export default function ApplicationsMobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: applications, isLoading } = useApplications();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  
   let filteredApps =
    filter === "All"
      ? applications || []
      : (applications || []).filter((app: any) => app.status === filter);


   if (search.trim()) {
    filteredApps = filteredApps.filter((app: any) =>
      [app.job_title, app.company, app.status]
        .filter(Boolean) // ignore null fields
        .some((field) =>
          field.toLowerCase().includes(search.trim().toLowerCase())
        )
    );
  }     

          const profilePic = localStorage.getItem("profile_picture");

// Check for null, "null", or empty string
const validProfilePic =
  profilePic && profilePic !== "null" && profilePic.trim() !== ""
    ? profilePic
    : "/default_profile.png";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-20">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
        <h1 className="text-lg font-semibold flex-1 text-center">
          Applications List
        </h1>
        <button
          onClick={() => navigate("/my-profile")}
          className="ml-4 w-9 h-9 rounded-full overflow-hidden border"
        >
          <img
              src={validProfilePic}
            alt="user"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
      <div className="w-full bg-white border-b flex justify-center items-center py-2">
        <div className="max-w-[100%] text-center font-inter italic">
          <Ticker />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter */}
      <div className="px-4 mt-3">
        <ApplicationsFilter filter={filter} setFilter={setFilter} />
      </div>

      {/* Applications List */}
      <div className="flex-1 overflow-y-auto px-4 mt-4">
        {isLoading ? (
          <div className="text-gray-500">Loading applications...</div>
        ) : filteredApps.length ? (
          filteredApps.map((app: any) => (
            <ApplicationCardMobile key={app.id} {...app} />
          ))
        ) : (
          <div className="text-gray-500">No applications found.</div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/applications/new")}
        className="fixed bottom-16 right-6 bg-customBlue text-white p-4 rounded-full shadow-lg"
      >
        <FaPlus />
      </button>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2">
        <NavItem label="Dashboard" icon={<FaHome />} to="/dashboard" location={location} />
        <NavItem label="Applications" icon={<FaFileAlt />} to="/applications" location={location} />
        <NavItem label="Resume AI" icon={<FaRobot />} to="/ai/resume/feedback" location={location} />
        <NavItem label="Profile" icon={<FaUser />} to="/my-profile" location={location} />
      </div>
    </div>
  );
}

function NavItem({
  label,
  icon,
  to,
  location,
}: {
  label: string;
  icon: React.ReactNode;
  to: string;
  location: any;
}) {
  const navigate = useNavigate();
  const isActive = location.pathname.startsWith(to);

  return (
    <button
      onClick={() => navigate(to)}
      className={`flex flex-col items-center text-sm ${
        isActive ? "text-customBlue" : "text-gray-600"
      }`}
    >
      <div className={`text-lg ${isActive ? "text-customBlue" : ""}`}>
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}
