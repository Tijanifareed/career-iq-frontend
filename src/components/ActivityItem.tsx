// components/ActivityItem.tsx
import React from "react";

interface Props {
  title: string;
  company: string;
  status: string;
  timeAgo: string;
}

export default function ActivityItem({ title, company, status, timeAgo }: Props) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-500">{company}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold">{status}</div>
        <div className="text-xs text-gray-400">{timeAgo}</div>
      </div>
    </div>
  );
}
