import React from "react";

interface DividerWithTextProps {
  text?: string;
  className?: string;
}

const DividerWithText: React.FC<DividerWithTextProps> = ({
  text = "OR",
  className = "",
}) => {
  return (
    <div className={`flex items-center my-6 ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="px-3 text-sm text-gray-500 font-inter">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default DividerWithText;
