// pages/AboutPage.tsx
import React from "react";

export default function AboutPage() {
  return (
    <section className="w-full min-h-screen bg-customOffBlue flex flex-col items-center justify-center px-6 py-20">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-[#0A2540] via-customBlue to-[#0A2540] bg-clip-text text-transparent mb-12">
        About HireJourney
      </h1>

      {/* Story */}
      <div className="max-w-3xl text-center">
        <p className="text-xl sm:text-2xl text-gray-700 italic leading-relaxed mb-6">
          "Job search is broken. I’ve faced the frustration of sending countless
          applications into the void, not knowing if my resume even stood a
          chance. I built HireJourney to make the process fairer, smarter, and
          empowering for everyone."
        </p>

        {/* Signature */}
        <div className="mt-8">
          <p className="text-lg font-semibold text-gray-900">Fareed Tijani</p>
          <p className="text-sm text-gray-500">Founder & CEO, HireJourney</p>
        </div>
      </div>
    </section>
  );
}
