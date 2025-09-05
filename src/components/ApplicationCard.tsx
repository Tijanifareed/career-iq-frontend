

import React from "react";
import { useNavigate } from "react-router-dom";

interface ApplicationCardProps {
  application: any; // Replace with proper type later
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const navigate = useNavigate();
  const { id, job_title, company, status, applied_date, interview_date_utc } =
    application;

  const formattedApplied = new Date(applied_date).toISOString().split("T")[0];
  const formattedInterview = interview_date_utc
    ? new Date(interview_date_utc).toISOString().split("T")[0]
    : null;

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

      {/* Status */}
      <div className="mt-3">
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            statusColors[status] || statusColors.not_applied
          }`}
        >
          {status}
        </span>
      </div>

      {/* Dates */}
      <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-600">
        <p>
          <span className="font-medium">📅 Applied:</span> {formattedApplied}
        </p>
        {formattedInterview && (
          <p>
            <span className="font-medium">🎤 Interview:</span>{" "}
            {formattedInterview}
          </p>
        )}
      </div>
    </div>
  );
}
