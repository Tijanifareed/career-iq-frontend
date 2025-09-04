
import React from "react";

interface ApplicationCardProps {
  id: number;
  job_title: string;
  company: string;
  status: string;
  applied_date: string;
  interview_date_utc?: string | null;
}

export default function ApplicationCard({
  job_title,
  company,
  status,
  applied_date,
  interview_date_utc,
}: ApplicationCardProps) {
  // Format applied date
  const formattedApplied = new Date(applied_date).toISOString().split("T")[0]; // YYYY-MM-DD

  // Format interview date only if present
  const formattedInterview = interview_date_utc
    ? new Date(interview_date_utc).toISOString().split("T")[0]
    : null;

  // Status colors
  const statusColors: Record<string, string> = {
    Applied: "bg-customBlue text-white",
    Interview: "bg-orange-400 text-white",
    Offer: "bg-green-500 text-white",
    Rejected: "bg-red-700 text-white",
    "Not Applied": "bg-gray-100 text-gray-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
      {/* Job Title + Company */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{job_title}</h2>
        <p className="text-sm text-gray-500">{company}</p>
      </div>

      {/* Status */}
      <div className="mt-3">
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            statusColors[status] || statusColors["Not Applied"]
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
