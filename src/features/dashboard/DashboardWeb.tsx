// pages/DashboardWeb.tsx
import React from "react";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import ActivityItem from "../../components/ActivityItem";
import {
  FaPaperPlane,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useDashboardStats, useRecentApplications } from "../../queries/dashboard";

export default function DashboardWeb() {
  const navigate = useNavigate();

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrObj,
  } = useDashboardStats();

  const {
    data: recent,
    isLoading: recentLoading,
    isError: recentError,
    error: recentErrObj,
  } = useRecentApplications();

  console.log("Stats:", stats);
console.log("Recent:", recent);

  const loading = statsLoading || recentLoading;
  const hasError = statsError || recentError;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* NAVBAR (web-only content) */}
          <div className="flex justify-end items-center px-6 py-4 bg-white border-b">
            <div className="relative">
              <input
                type="search"
                placeholder="Search applications..."
                className="px-3 py-2 border rounded-md w-72 focus:outline-none"
              />
            </div>

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

          {/* DASHBOARD OVERVIEW HEADER */}
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold font-inter">Dashboard Overview</h1>
            <button
              onClick={() => navigate("/applications/new")}
              className="px-4 py-2 bg-customBlue text-white rounded-md"
            >
              + Add Application
            </button>
          </div>

          {/* Optional global error banner */}
          {hasError && (
            <div className="mx-6 mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
              {String(
                (statsErrObj as any)?.message ||
                  (recentErrObj as any)?.message ||
                  "Failed to load dashboard data."
              )}
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 mb-6">
            <StatCard
              title="Applied"
              count={loading ? "..." : stats?.applied ?? 0}
              icon={<FaClipboardList />}
              iconColor="text-customBlue"
            />
            <StatCard
              title="Interview"
              count={loading ? "..." : stats?.interview ?? 0}
              icon={<FaPaperPlane />}
              iconColor="text-orange-300"
            />
            <StatCard
              title="Offer"
              count={loading ? "..." : stats?.offer ?? 0}
              icon={<FaCheckCircle />}
              iconColor="text-green-300"
            />
            <StatCard
              title="Rejected"
              count={loading ? "..." : stats?.rejected ?? 0}
              icon={<FaTimesCircle />}
              iconColor="text-red-400"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mx-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              {/* <button
                className="text-sm text-customBlue"
                onClick={() => navigate("/applications")}
              >
                View all
              </button> */}
            </div>

            <div>
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
        </main>
      </div>
    </div>
  );
}
