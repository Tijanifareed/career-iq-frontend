// components/HowItWorksSection.tsx
import React from "react";
import PainCard from "./PainCard";
import WorkCard from "./WorkCard";

export default function HowItWorksSection() {
  const problems = [
    {
      prefixText: "1.",
      image: "/icons/add-app1.png",
      title: "Add your applications",
      description: '"Easily upload and organize all your job applications in one place."'
    },
    {
     prefixText: "2.",
      image: "/icons/track-progress.png",
      title: "Track your progress",
      description: '"Monitor each application’s status and manage follow-ups effortlessly."'
    },
    {
     prefixText: "3.",
      image: "/icons/optimize.png",
      title: "Optimize your resume",
      description: '"Get AI-powered feedback to enhance your resume and increase your chances."'
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-20 px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          How We Help You Get Hired
        </h2>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <WorkCard
              key={index}
              prefixText={problem.prefixText} 
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
