// components/CallToAction.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-customOffBlue py-20 px-6">
      <div className="max-w-3xl mx-auto text-center text-black">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold font-inter mb-8">
          Ready to Transform Your Hiring <br/> Process?
        </h2>

        {/* Button */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full sm:w-auto px-8 py-4 bg-customBlue text-customOffBlue font-semibold text-lg rounded-md shadow-md hover:bg-blue-400 transition"
        >
          Start Your Free Trial Today!
        </button>
      </div>
    </section>
  );
}
