// components/ProblemsSection.tsx
import React from "react";
import PainCard from "./PainCard";

export default function ProblemsSection() {
  const problems = [
    {
      image: "/icons/manual-tracking.png",
      title: "Manual Tracking Mess",
      description: '"Spreadsheets and sticky notes make it easy to lose track of your applications."'
    },
    {
      image: "/icons/time-consuming.png",
      title: "Time-Consuming Applications",
      description: '"Applying for jobs feels endless without a system that saves time."'
    },
    {
      image: "/icons/resume-feedback.png",
      title: "Unclear Resume Feedback",
      description: '"You never know if your resume passes ATS or stands out to recruiters."'
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-20 px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Overcome the challenges holding you back
        </h2>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <PainCard
              key={index}
              image={problem.image}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
