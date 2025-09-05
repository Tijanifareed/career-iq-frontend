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
const API_BASE = import.meta.env.VITE_API_URL

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

  const loading = statsLoading || recentLoading;
  const hasError = statsError || recentError;
  const [fetching, setFetching] = React.useState(false);


  const handleRecentClick = async (id: number) => {

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found, please login again.");

    try {
      setFetching(true);
      const res = await fetch(`${API_BASE}/applications/my-applications/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch details");
      const fullApp = await res.json();

      navigate(`/applications/${id}`, { state: { application: fullApp.data } });
    } catch (err) {
      console.error(err);
      alert("Unable to load application details. Please try again.");
    } finally {
      setFetching(false);
    }
  };


  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 fixed top-0 left-0 h-screen border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-20 flex justify-end items-center px-6 py-2 bg-white border-b shadow-sm">
          {/* <div className="relative">
            <input
              type="search"
              placeholder="Search applications..."
              className="px-3 py-2 border rounded-md w-72 focus:outline-none"
            />
          </div> */}

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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Dashboard Header + Add button */}
          <div className="flex items-center justify-between px-6 py-4 mt-5 bg-gray-50 z-10">
            <h1 className="text-2xl font-semibold font-inter">Dashboard Overview</h1>
            <button
              onClick={() => navigate("/applications/new")}
              className="px-4 py-2 bg-customBlue text-white rounded-md"
            >
              + Add Application
            </button>
          </div>

          {/* Stats Row (can also be sticky if you want) */}
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
                    onClick={() => handleRecentClick(r.id)}
                  />
                ))
              ) : (
                <div className="text-gray-500">No recent activity</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {fetching && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="w-12 h-12 border-4 border-customBlue border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
