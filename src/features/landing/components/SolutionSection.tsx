// components/SolutionSection.tsx
import React from "react";
import PainCard from "./PainCard";

export default function SolutionSection() {
  const problems = [
    {
      image: "/icons/application-tracking.png",
      title: "Smart Application Tracking",
      description: '"Keep your job search organized in one dashboard-no more messy spreadsheets."'
    },
    {
      image: "/icons/ai-resume-feed.png",
      title: "AI Resume Feedback",
      description: '"Get clear, AI-powered suggestions to stand out to hiring managers."'
    },
    {
      image: "/icons/ats-checker.png",
      title: "ATS & Keyword Checker",
      description: '"Instantly check how well your resume matches job descriptions with ATS-friendly scoring and keyword insights."'
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-20 px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center font-inter text-gray-900 mb-16">
          Powerful features designed for modern job
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
