
// pages/DashboardMobile.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StatCard from "../../components/StatCard";
import ActivityItem from "../../components/ActivityItem";
import {
  FaPaperPlane,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaHome,
  FaFileAlt,
  FaRobot,
  FaComments,
} from "react-icons/fa";

import { useDashboardStats, useRecentApplications } from "../../queries/dashboard";

export default function DashboardMobile() {
  const navigate = useNavigate();

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recent, isLoading: recentLoading } = useRecentApplications();

  const loading = statsLoading || recentLoading;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
        <h1 className="text-lg font-semibold text-center flex-1">
          Dashboard Overview
        </h1>
        <button
          onClick={() => navigate("/profile")}
          className="ml-4 w-9 h-9 rounded-full overflow-hidden border"
        >
          <img
            src="/path/to/avatar.jpg"
            alt="user"
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 px-4 mt-4">
        <StatCard
          title="Applied"
          count={loading ? "..." : stats?.applied ?? 0}
          icon={<FaClipboardList />}
          className="p-6"
          iconColor="text-customBlue"
        />
        <StatCard
          title="Interview"
          count={loading ? "..." : stats?.interview ?? 0}
          icon={<FaPaperPlane />}
          className="p-6"
          iconColor="text-orange-300"
        />
        <StatCard
          title="Offer"
          count={loading ? "..." : stats?.offer ?? 0}
          icon={<FaCheckCircle />}
          className="p-6"
          iconColor="text-green-300"
        />
        <StatCard
          title="Rejected"
          count={loading ? "..." : stats?.rejected ?? 0}
          icon={<FaTimesCircle />}
          className="p-6"
          iconColor="text-red-400"
        />
      </div>

      {/* Add Application button */}
      <button
        onClick={() => navigate("/applications/new")}
        className="mx-4 mt-6 py-3 bg-customBlue text-white rounded-md w-auto"
      >
        + Add Application
      </button>

      {/* Recent Activity */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-semibold mb-3">Recent Activity</h2>
        <div className="space-y-3">
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : recent && recent.length ? (
            recent.map((r: any) => (
              <ActivityItem
                key={r.id}
                title={r.job_title}
                company={r.company_name}
                status={r.status}
                timeAgo={r.time_ago || "just now"}
              />
            ))
          ) : (
            <div className="text-gray-500">No recent activity</div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2">
        <NavItem label="Dashboard" icon={<FaHome />} to="/dashboard" />
        <NavItem label="Applications" icon={<FaFileAlt />} to="/applications" />
        <NavItem label="Resume AI" icon={<FaRobot />} to="/resume-ai" />
        <NavItem label="Interview" icon={<FaComments />} to="/interview" />

      </div>
    </div>
  );
}




function NavItem({
  label,
  icon,
  to,
}: {
  label: string;
  icon: React.ReactNode;
  to: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if this nav item is active
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
