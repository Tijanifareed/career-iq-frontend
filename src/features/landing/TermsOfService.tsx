// pages/TermsOfService.tsx
import React from "react";

export default function TermsOfService() {
  return (
    <section className="w-full min-h-screen bg-customOffBlue px-6 py-20">
      {/* Hero Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-[#0A2540] via-customBlue to-[#0A2540] bg-clip-text text-transparent mb-12">
        Terms of Service
      </h1>

      <div className="max-w-4xl mx-auto space-y-10 text-gray-700 leading-relaxed">
        {/* Intro */}
        <p>
          Welcome to <span className="font-semibold">HireJourney</span>. By using our platform, 
          you agree to the terms outlined below. Please read them carefully.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Use of Our Service</h2>
          <p>
            HireJourney provides tools to track job applications, optimize resumes,
            and support your career journey. You agree to use our services only
            for lawful purposes and in compliance with all applicable regulations.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account if you violate
            these terms or misuse the platform.
          </p>
        </div>

        {/* Closing */}
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
