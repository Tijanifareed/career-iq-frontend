
// pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import BottomNav from "../../components/BottomNav";
import StatCard from "../../components/StatCard";
import ActivityItem from "../../components/ActivityItem";
import { FaPaperPlane, FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../../apis/api";
import { useNavigate } from "react-router-dom";

export default function DashboardMobile() {
  const [stats, setStats] = useState({ applied: 0, interview: 0, offer: 0, rejected: 0 });
  const [recent, setRecent] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const statsRes = await api.get("/applications/stats");
        const recentRes = await api.get("/applications/recent");
        if (!mounted) return;
        setStats(statsRes.data || { applied: 0, interview: 0, offer: 0, rejected: 0 });
        setRecent(recentRes.data || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* NAVBAR */}
          <div className="flex justify-end items-center px-6 py-4 bg-white border-b">
            {/* Search */}
            <div className="relative">
              <input
                type="search"
                placeholder="Search applications..."
                className="px-3 py-2 border rounded-md w-72 focus:outline-none"
              />
            </div>

            {/* Avatar */}
            <button
              onClick={() => navigate("/profile")}
              className="ml-4 w-9 h-9 rounded-full overflow-hidden border"
            >
              <img src="/path/to/avatar.jpg" alt="user" className="w-full h-full object-cover" />
            </button>
          </div>

          {/* DASHBOARD OVERVIEW HEADER */}
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            <button
              onClick={() => navigate("/applications/new")}
              className="px-4 py-2 bg-customBlue text-white rounded-md"
            >
              + Add Application
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 mb-6">
            <StatCard title="Applied" count={loading ? "..." : stats.applied} icon={<FaClipboardList />} />
            <StatCard title="Interview" count={loading ? "..." : stats.interview} icon={<FaPaperPlane />} />
            <StatCard title="Offer" count={loading ? "..." : stats.offer} icon={<FaCheckCircle />} />
            <StatCard title="Rejected" count={loading ? "..." : stats.rejected} icon={<FaTimesCircle />} />
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mx-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <button className="text-sm text-customBlue" onClick={() => navigate("/applications")}>
                View all
              </button>
            </div>

            <div>
              {loading ? (
                <div className="text-gray-500">Loading...</div>
              ) : recent.length ? (
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

      <BottomNav />
    </div>
  );
}
