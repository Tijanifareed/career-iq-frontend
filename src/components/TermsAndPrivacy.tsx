import { Link } from "react-router-dom";

export default function TermsAndPrivacy({ className = "" }) {
  return (
    <p className={`text-xs font-inter text-gray-500 text-center ${className}`}>
      By continuing, you agree to CareerIQ&apos;s{" "}
      <Link to="/terms" className="text-customBlue hover:underline font-inter">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link to="/privacy" className="text-customBlue hover:underline font-inter">
        Privacy Policy
      </Link>
      .
    </p>
  );
}
