import React from "react";
import { FcGoogle } from "react-icons/fc"; // Google logo

interface GoogleSignInButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onClick,
  text = "Sign in with Google",
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 bg-white hover:bg-gray-50 transition ${className}`}
    >
      <FcGoogle size={20} />
      <span className="text-sm font-medium text-gray-700 font-inter">
        {text}
      </span>
    </button>
  );
};

export default GoogleSignInButton;
