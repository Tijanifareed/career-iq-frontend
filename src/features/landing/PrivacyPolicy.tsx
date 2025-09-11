// pages/PrivacyPolicy.tsx
import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="w-full min-h-screen bg-customOffBlue px-6 py-20">
      {/* Hero Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-[#0A2540] via-customBlue to-[#0A2540] bg-clip-text text-transparent mb-12">
        Privacy Policy
      </h1>

      <div className="max-w-4xl mx-auto space-y-10 text-gray-700 leading-relaxed">
        {/* Intro */}
        <p>
          At <span className="font-semibold">HireJourney</span>, your privacy is our top priority. 
          This policy explains how we collect, use, and protect your data.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email, and job
            application details to provide better insights and services.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Your Data</h2>
          <p>
            Your data helps us deliver features like resume feedback, application
            tracking, and personalized recommendations. We never sell your data to
            third parties.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Data Protection</h2>
          <p>
            We use industry-standard encryption and security measures to protect
            your information from unauthorized access.
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
