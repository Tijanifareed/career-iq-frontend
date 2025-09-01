// import React from "react";

// interface ButtonProps {
//   onClick?: () => void;
//   children: React.ReactNode;
//   type?: "button" | "submit" | "reset";
//   className?: string;
// }

// const Button: React.FC<ButtonProps> = ({
//   onClick,
//   children,
//   type = "submit",
//   className = "",
// }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`w-full bg-customBlue text-white font-inter py-2 rounded-md transition-colors ${className}`}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;


import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean; // ✅ new prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "submit",
  className = "",
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading} // prevent double clicks
      className={`w-full bg-customBlue text-white font-inter py-2 rounded-md flex justify-center items-center gap-2 transition-colors ${className} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
      )}
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
