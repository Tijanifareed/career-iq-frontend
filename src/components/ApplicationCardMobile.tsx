// import React from "react";
// import { useNavigate } from "react-router-dom";

// interface ApplicationCardMobileProps {
//   id: number;
//   job_title: string;
//   company: string;
//   status: string;
//   applied_date: string;
//   interview_date_utc?: string | null;
//   job_link?: string | null;
//   notes?: string | null;
//   job_description?: string | null;
//   follow_up_date?: string | null;
//   interview_timezone?: string | null;
// }

// export default function ApplicationCardMobile({
//   id,
//   job_title,
//   company,
//   status,
//   applied_date,
//   ...rest
// }: ApplicationCardMobileProps) {
//   const navigate = useNavigate();

//   const formattedApplied = new Date(applied_date).toISOString().split("T")[0];

//   const handleClick = () => {
//     navigate(`/applications/${id}`, {
//       state: {
//         application: {
//           id,
//           job_title,
//           company,
//           status,
//           applied_date,
//           ...rest, // pass along any extra fields so details page works
//         },
//       },
//     });
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="bg-white rounded-lg shadow p-4 mb-3 cursor-pointer hover:shadow-md transition"
//     >
//       {/* Company & Date */}
//       <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
//         <span className="font-medium">{company}</span>
//         <span>{formattedApplied}</span>
//       </div>

//       {/* Job Title */}
//       <h2 className="text-base font-semibold text-gray-800">{job_title}</h2>

//       {/* Status */}
//       <div className="mt-2">
//         <span
//           className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//             status === "Applied"
//               ? "bg-blue-100 text-blue-600"
//               : status === "Interview"
//               ? "bg-orange-100 text-orange-600"
//               : status === "Rejected"
//               ? "bg-red-100 text-red-600"
//               : status === "Offer"
//               ? "bg-green-100 text-green-600"
//               : "bg-gray-100 text-gray-600"
//           }`}
//         >
//           {status}
//         </span>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";
import { getTimezoneAbbr } from "./timezoneEnum";

interface ApplicationCardMobileProps {
  id: number;
  job_title: string;
  company: string;
  status: string;
  applied_date: string;
  interview_date?: string | null;
  interview_timezone?: string | null;
  interview_date_utc?: string | null;
  job_link?: string | null;
  notes?: string | null;
  job_description?: string | null;
  follow_up_date?: string | null;
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

export default function ApplicationCardMobile({
  id,
  job_title,
  company,
  status,
  applied_date,
  interview_date,
  interview_timezone,
  ...rest
}: ApplicationCardMobileProps) {
  const navigate = useNavigate();

  const appliedDate = formatDate(applied_date);
  const interviewDate = formatDate(interview_date || null);
  const interviewTime = formatTime(interview_date || null);
  const timezoneAbbr = interview_timezone
    ? getTimezoneAbbr(interview_timezone) || interview_timezone
    : null;

  const handleClick = () => {
    navigate(`/applications/${id}`, {
      state: {
        application: {
          id,
          job_title,
          company,
          status,
          applied_date,
          interview_date,
          interview_timezone,
          ...rest,
        },
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow p-4 mb-3 cursor-pointer hover:shadow-md transition"
    >
      {/* Company & Applied Date */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
        <span className="font-medium">{company}</span>
        <span>{appliedDate}</span>
      </div>

      {/* Job Title */}
      <h2 className="text-base font-semibold text-gray-800">{job_title}</h2>

      {/* Status + Interview Time */}
      <div className="mt-2 flex justify-between items-center">
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

        {/* Interview time + timezone if available */}
        {status === "Interview" && interviewTime && (
          <span className="block max-w-[140px] truncate text-xs text-gray-500 font-medium">
            ⏰ {interviewTime} {timezoneAbbr}
          </span>
        )}
      </div>

      {/* Interview Date */}
      {status === "Interview" && interviewDate && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">🎤 Interview:</span> {interviewDate}
        </div>
      )}
    </div>
  );
}
