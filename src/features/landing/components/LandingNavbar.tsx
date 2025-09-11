// // components/Navbar.tsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function LandingNavbar() {
//   const navigate = useNavigate();

//   return (
//     <nav className="w-full bg-white border-b shadow-sm px-6 py-2 flex justify-between items-center">
//       {/* Left: Logo + Text */}
//       <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
//         <img
//           src="/logo.png" // replace with your actual logo path
//           alt="HireJourney Logo"
//           className="h-8 w-8"
//         />
//         <span className="text-xl font-bold italic  text-customBlue font-inter">
//           HireJourney
//         </span>
//       </div>

//       {/* Right: Buttons */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={() => navigate("/signup")}
//           className="px-4 py-2 bg-customBlue font-inter text-white text-sm rounded-md font-medium hover:bg-blue-400 transition"
//         >
//           Sign Up
//         </button>
//         <button
//           onClick={() => navigate("/login")}
//           className="px-4 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
//         >
//           Log in
//         </button>
//       </div>
//     </nav>
//   );
// }

// components/LandingNavbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Logo + Text */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo.png" // replace with your actual logo path
          alt="HireJourney Logo"
          className="h-8 w-8"
        />
        <span className="text-xl font-bold italic text-customBlue font-inter">
          HireJourney
        </span>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/signup")}
          className="px-5 py-2 bg-customBlue font-inter text-white text-sm rounded-md font-medium hover:bg-blue-500 transition w-full sm:w-auto"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 border border-gray-300 rounded-md text-sm text-gray-700 font-inter hover:bg-gray-100 transition w-full sm:w-auto"
        >
          Log in
        </button>
      </div>
    </nav>
  );
}
