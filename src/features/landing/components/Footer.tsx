// components/Footer.tsx
import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-r from-[#0A2540] via-customBlue to-[#0A2540] text-gray-300 pt-16 pb-10 px-6 overflow-hidden">
      {/* Background Accent Circles (blue glow only) */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-customBlue/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-customBlue/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="HireJourney logo" className="w-8 h-8" />
            <span className="text-xl font-bold italic text-white">HireJourney</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Take the stress out of job hunting. Stay organized, improve your resume, and land the job you deserve.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/features" className="hover:text-white transition">Features</a></li>
            {/* <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li> */}
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            {/* <li><a href="/faq" className="hover:text-white transition">FAQ</a></li> */}
          </ul>
        </div>

        {/* Resources */}
        <div>
          {/* <h4 className="text-white font-semibold mb-4">Resources</h4> */}
          <ul className="space-y-2 text-sm">
            {/* <li><a href="/blog" className="hover:text-white transition">Blog</a></li> */}
            {/* <li><a href="/guides" className="hover:text-white transition">Guides</a></li> */}
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Stay in the loop</h4>
          <p className="text-sm text-gray-400 mb-4">
            Join our newsletter to get tips, resources, and updates.
          </p>
          <form className="flex bg-[#0A2540]/60 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-transparent text-sm focus:outline-none text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-customBlue hover:bg-blue-500 text-white text-sm font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social + Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Social Icons */}
        <div className="flex gap-5 text-xl">
          <a href="https://twitter.com" className="hover:text-customBlue transition transform hover:scale-110"><FaTwitter /></a>
          <a href="https://linkedin.com" className="hover:text-customBlue transition transform hover:scale-110"><FaLinkedin /></a>
          <a href="https://instagram.com" className="hover:text-customBlue transition transform hover:scale-110"><FaInstagram /></a>
          <a href="https://facebook.com" className="hover:text-customBlue transition transform hover:scale-110"><FaFacebook /></a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} HireJourney. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
