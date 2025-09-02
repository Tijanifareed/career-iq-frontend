// components/StatCard.tsx
import React from "react";

interface Props {
  title: string;
  count: number | string;
  icon?: React.ReactNode;
  className?: string;
  iconColor?: string; 
}

export default function StatCard({ title, count, icon, className = "", iconColor = "text-gray-400", }: Props) {
  return (
    <div className={`flex-1 bg-white border border-gray-200 rounded-lg p-10 flex items-center justify-between ${className}`}>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-bold mt-2">{count}</div>
      </div>
      <div className={`text-3xl ${iconColor}`}>{icon}</div>
    </div>
  );
}
