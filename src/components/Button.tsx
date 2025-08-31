import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-customBlue text-white py-2 rounded-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
