import React from "react";

interface Props {
  filter: string;
  setFilter: (val: string) => void;
}

export default function ApplicationsFilter({ filter, setFilter }: Props) {
  return (
    <div className="relative inline-block w-48 mb-6">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="All">All</option>
        <option value="Not Applied">Not Applied</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offers</option>
        <option value="Rejected">Rejected</option>
      </select>

      {/* Custom arrow using inline SVG */}
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  );
}
