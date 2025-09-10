// components/PainCard.tsx
import React from "react";

interface PainCardProps {
  image: string;
  title: string;
  description: string;
}

export default function PainCard({ image, title, description }: PainCardProps) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <img src={image} alt={title} className="w-16 h-16 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 italic font-inter">{description}</p>
    </div>
  );
}
