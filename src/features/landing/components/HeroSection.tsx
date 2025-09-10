
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function HeroSection() {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full bg-gray-50 min-h-screen flex items-center justify-center px-6">
//       <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl">
//         {/* Left Side (Hero Text) */}
//         <div className="text-center md:text-left">
//           <h1 className="text-4xl md:text-5xl font-bold font-inter italic text-gray-900 mb-4 leading-tight">
//             Every application<br /> counts. Make <br /> yours stand out.
//           </h1>
//           <p className="text-base font-inter text-gray-600 mb-6">
//              Track your applications and optimize your resume with AI feedback<br/> so you can get hired faster.
//            </p>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//              onClick={() => navigate("/signup")}
//                className="px-6 py-2 bg-customBlue text-white text-sm  rounded-md font-inter hover:bg-blue-400 transition"
//              >
//                Sign Up for Free!!
//              </button>
//              <button
//                onClick={() => navigate("/login")}
//                className="px-14 py-2 border border-gray-300 rounded-md text-sm text-gray-700 font-inter hover:bg-gray-100 transition"
//              >
//                Log in
//              </button>
//            </div>
//         </div>

//         {/* Right Side (Hero Image) */}
//         <div className="flex justify-center">
//           <img
//             src="/hero-image.png" // replace with your actual hero image
//             alt="HireJourney dashboard preview"
//             className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gray-50 min-h-dvh flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl">
        {/* Left Side (Hero Text) */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-inter italic text-gray-900 mb-10 leading-tight ">
            Every application<br /> counts. Make <br /> yours stand out.
          </h1>
          <p className="text-base font-inter text-gray-600 mb-8">
            Track your applications and optimize your resume with AI feedback
            <br /> so you can get hired faster.
          </p>

          {/* Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
  <button
    onClick={() => navigate("/signup")}
    className="min-w-[180px] px-6 py-3 bg-customBlue text-white text-sm rounded-md font-inter hover:bg-blue-400 transition"
  >
    Sign Up for Free!!
  </button>
  <button
    onClick={() => navigate("/login")}
    className="min-w-[180px] px-6 py-3 border border-gray-300 rounded-md text-sm text-gray-700 font-inter hover:bg-gray-100 transition"
  >
    Log in
  </button>
</div>


        </div>

        {/* Right Side (Hero Image) */}
        <div className="flex justify-center">
          <img
            src="/hero-image.png" // replace with your actual hero image
            alt="HireJourney dashboard preview"
            className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
