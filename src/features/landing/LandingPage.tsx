// pages/LandingPage.tsx
import React from "react";
import Navbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection"
import ProblemsSection from "./components/ProblemsSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white ">
        <Navbar />
      </header>

      {/* Placeholder for rest of landing sections */}
     <main className="flex-1  ">
        <HeroSection />
        <ProblemsSection />
        <SolutionSection />
        <HowItWorksSection/>
        {/* other sections coming soon */}
      </main>
    </div>
  );
}
