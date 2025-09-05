// components/ActivityItem.tsx
import React from "react";

interface Props {
  title: string;
  company: string;
  status: string;
  timeAgo: string;
  onClick?: () => void;
}

export default function ActivityItem({ title, company, status, timeAgo, onClick}: Props) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0" onClick={onClick}>
      
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-500">{company}</div>
      </div>
      <div className="text-right">
        <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            status === "Applied"
              ? "bg-customBlue text-white"
              : status === "Interview"
              ? "bg-orange-400 text-white"
              : status === "Offer"
              ? "bg-green-500 text-white"
              : status === "Rejected"
              ? "bg-red-700 text-white"
              : "bg-gray-100 text-gray-600"
          }`}>{status}</div>
        <div className="text-xs text-gray-400">{timeAgo}</div>
      </div>
    </div>
  );
}
