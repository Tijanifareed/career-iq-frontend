import React from "react";
import { useNavigate } from "react-router-dom";

interface ApplicationCardMobileProps {
  id: number;
  job_title: string;
  company: string;
  status: string;
  applied_date: string;
  interview_date_utc?: string | null;
  job_link?: string | null;
  notes?: string | null;
  job_description?: string | null;
  follow_up_date?: string | null;
  interview_timezone?: string | null;
}

export default function ApplicationCardMobile({
  id,
  job_title,
  company,
  status,
  applied_date,
  ...rest
}: ApplicationCardMobileProps) {
  const navigate = useNavigate();

  const formattedApplied = new Date(applied_date).toISOString().split("T")[0];

  const handleClick = () => {
    navigate(`/applications/${id}`, {
      state: {
        application: {
          id,
          job_title,
          company,
          status,
          applied_date,
          ...rest, // pass along any extra fields so details page works
        },
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow p-4 mb-3 cursor-pointer hover:shadow-md transition"
    >
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
