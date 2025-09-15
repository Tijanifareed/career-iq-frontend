

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useApplications } from "../../queries/applications";
import ApplicationCard from "../../components/ApplicationCard";
import ApplicationsFilter from "../../components/ApplicationsFilter";
import { useNavigate } from "react-router-dom";
import Ticker from "../../components/TickerComponent";

export default function ApplicationsWeb() {
  const navigate = useNavigate();
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

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 fixed top-0 left-0 h-screen border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Navbar */}
        {/* <div className="sticky top-0 z-10 flex justify-end items-center px-6 py-2 bg-white border-b shadow-sm">
          <Ticker />
          <div className="relative">
            <input
              type="search"
              placeholder="Search applications..."
              className="px-3 py-2 border rounded-md w-72 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        </div> */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-2 bg-white border-b shadow-sm">
  {/* Left side → Ticker */}
  <div className="flex-1">
    <Ticker />
  </div>

  {/* Right side → Search + Profile */}
  <div className="flex items-center gap-4">
    <div className="relative">
      <input
        type="search"
        placeholder="Search applications..."
        className="px-3 py-2 border rounded-md w-72 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <button
      onClick={() => navigate("/profile")}
      className="w-9 h-9 rounded-full overflow-hidden border"
    >
      <img
        src="/path/to/avatar.jpg"
        alt="user"
        className="w-full h-full object-cover"
      />
    </button>
  </div>
</div>


        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between px-1 py-4">
            <h1 className="text-2xl font-semibold font-inter">
              Applications List
            </h1>
            <button
              onClick={() => navigate("/applications/new")}
              className="px-4 py-2 bg-customBlue text-white rounded-md"
            >
              + Add Application
            </button>
          </div>

          {/* Dropdown Filter */}
          <ApplicationsFilter filter={filter} setFilter={setFilter} />

          {/* Applications Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-lg shadow-md p-4 h-32"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))
            ) : filteredApps.length ? (
              filteredApps.map((app: any) => (
                // <ApplicationCard 
                // key={app.id} 
                // {...app} 
                // onClick={() => navigate(`/applications/${app.id}`, { state: { application: app } })}
                // />
                <ApplicationCard key={app.id} application={app} />
              ))
            ) : (
              <div className="col-span-full text-gray-500">
                You have not added any applications yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
