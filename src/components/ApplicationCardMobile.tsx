import React from "react";

interface ApplicationCardMobileProps {
  id: number;
  job_title: string;
  company: string;
  status: string;
  applied_date: string;
}

export default function ApplicationCardMobile({
  job_title,
  company,
  status,
  applied_date,
}: ApplicationCardMobileProps) {
  const formattedApplied = new Date(applied_date).toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      {/* Company & Date */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
        <span className="font-medium">{company}</span>
        <span>{formattedApplied}</span>
      </div>

      {/* Job Title */}
      <h2 className="text-base font-semibold text-gray-800">{job_title}</h2>

      {/* Status */}
      <div className="mt-2">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            status === "Applied"
              ? "bg-blue-100 text-blue-600"
              : status === "Interview"
              ? "bg-orange-100 text-orange-600"
              : status === "Rejected"
              ? "bg-red-100 text-red-600"
              : status === "Offer"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
