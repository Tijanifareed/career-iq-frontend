import React from "react";
import { Link } from "react-router-dom"; // or next/link if using Next.js

interface AuthFooterProps {
  promptText: string; // e.g., "Don't have an account?"
  actionText: string; // e.g., "Sign Up"
  actionLink: string; // e.g., "/signup"
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  promptText,
  actionText,
  actionLink,
}) => {
  return (
    <div className="text-center mt-8 text-sm text-gray-600 font-inter mb-12">
      {promptText}{" "}
      <Link
        to={actionLink}
        className="text-customBlue font-semibold hover:underline font-inter"
      >
        {actionText}
      </Link>
    </div>
  );
};

export default AuthFooter;