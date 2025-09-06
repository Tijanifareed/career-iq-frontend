// pages/ApplicationDetailsWeb.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { FaArrowLeft } from "react-icons/fa";

type Application = {
  id: number;
  job_title: string;
  company: string;
  status: string;
  applied_date: string;
  job_link?: string | null;
  notes?: string | null;
  job_description?: string | null;
  interview_date_utc?: string | null;
  interview_timezone?: string | null;
  follow_up_date?: string | null;
};

export default function ApplicationDetailsWeb() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const application: Application | undefined = state?.application;

  if (!application) {
    return <p className="p-6">No application data found.</p>;
  }

  // const handleEdit = () => {
  //   navigate(`/applications/${application.id}/edit`, { state: { application } });
  // };
  // const [fetching, setFetching] = React.useState(false);
const [fetching, setFetching] = React.useState(false);
const API_BASE = import.meta.env.VITE_API_URL

const handleEdit = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login again.");

  try {
    setFetching(true);
    const res = await fetch(`${API_BASE}/applications/my-applications/${application.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch details");
    const fullApp = await res.json();

    navigate(`/applications/${application.id}/edit`, { state: { application: fullApp.data } });
  } catch (err) {
    console.error(err);
    alert("Unable to load application for editing. Please try again.");
  } finally {
    setFetching(false);
  }
};


  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      // TODO: delete API call
      navigate("/applications");
    }
  };

  const formatDate = (d?: string | null) =>
    d
      ? new Date(d).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0 fixed top-0 left-0 h-screen border-r bg-white">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col md:pl-64 h-screen">
        <div className="sticky top-0 z-10 flex justify-between items-center px-4 md:px-6 py-2 bg-white border-b">
            {/* Back icon (mobile only) */}
            <button
              onClick={() => navigate(-1)}
              className="md:hidden text-gray-600 mr-2"
            >
              <FaArrowLeft size={18} />
            </button>
        
            <div className="flex-1 flex justify-end items-center">
              {/* <div className="relative hidden md:block">
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
          </div>
        

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <h1 className="text-2xl font-semibold">Application Details</h1>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-customBlue text-white rounded-md hover:bg-blue-400 transition text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Details */}
            <h2 className="text-xl md:text-2xl font-bold break-words">
              {application.job_title}
            </h2>
            <p className="text-gray-600 mb-4 break-words">{application.company}</p>
            <hr className="my-4" />

            {/* Grid info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-gray-900">{application.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Applied Date</p>
                <p className="font-medium text-gray-900">
                  {formatDate(application.applied_date)}
                </p>
              </div>

              {application.interview_date_utc && (
                <div>
                  <p className="text-sm text-gray-500">Interview</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(application.interview_date_utc)}{" "}
                    {application.interview_timezone
                      ? `(${application.interview_timezone})`
                      : ""}
                  </p>
                </div>
              )}

              {application.follow_up_date && (
                <div>
                  <p className="text-sm text-gray-500">Follow-up Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(application.follow_up_date)}
                  </p>
                </div>
              )}
            </div>

            {/* Job link */}
            {application.job_link && (
  <div className="mb-4">
    <p className="text-sm text-gray-500">Job Link</p>
    <a
      href={application.job_link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-customBlue underline block break-all"
    >
      {application.job_link}
    </a>
  </div>
)}

            {/* Notes */}
            {application.notes && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">Notes</p>
                <div className="p-3 border rounded-md bg-gray-50 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {application.notes}
                </div>
              </div>
            )}

            {/* Job description */}
            {application.job_description && (
              <div>
                <p className="text-sm text-gray-500">Job Description</p>
                <div className="p-3 border rounded-md bg-gray-50 max-h-60 overflow-y-auto whitespace-pre-wrap">
                  {application.job_description}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {fetching && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="w-12 h-12 border-4 border-customBlue border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
    </div>
  );
}
