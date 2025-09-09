import React from "react";
import { useNavigate } from "react-router-dom";
import { getTimezoneAbbr } from "./timezoneEnum";

interface ApplicationCardProps {
  application: any; // Replace with proper type later
}

function formatDate(dateString: string | null) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(dateString: string | null) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const navigate = useNavigate();
  const { id, job_title, company, status, applied_date, interview_date, interview_timezone } = application;

  const appliedDate = formatDate(applied_date);
  const interviewDate = formatDate(interview_date);
  const interviewTime = formatTime(interview_date);
  const timezonee = interview_timezone;

  const statusColors: Record<string, string> = {
    Applied: "bg-customBlue text-white",
    Interview: "bg-orange-400 text-white",
    Offer: "bg-green-500 text-white",
    Rejected: "bg-red-700 text-white",
    not_applied: "bg-gray-100 text-gray-600",
  };

  return (
    <div
      onClick={() =>
        navigate(`/applications/${id}`, { state: { application } })
      }
      className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Job Title + Company */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{job_title}</h2>
        <p className="text-sm text-gray-500">{company}</p>
      </div>

      {/* Status + Interview Time */}
      <div className="mt-3 flex justify-between items-center">
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            statusColors[status] || statusColors.not_applied
          }`}
        >
          {status}
        </span>
        {interviewTime && status == "Interview" && (
          <span className="block max-w-[160px] truncate text-xs text-gray-500 font-medium ">
            ⏰ {interviewTime} - {getTimezoneAbbr(timezonee) || timezonee}
          </span>
        )}
      </div>

      {/* Dates */}
      <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-600 space-y-2">
        {appliedDate && (
          <p>
            <span className="font-medium">📅 Applied:</span> {appliedDate}
          </p>
        )}
        {interviewDate && status == "Interview" && (
          <p>
            <span className="font-medium">🎤 Interview:</span> {interviewDate}
          </p>
        )}
      </div>
    </div>
  );
}
