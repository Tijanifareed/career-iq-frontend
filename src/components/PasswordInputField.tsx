import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


interface PasswordInputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  forgotPasswordUrl?: string; // optional link
  placeholder?: string;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  label,
  value,
  onChange,
  forgotPasswordUrl,
  placeholder = "Enter your password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <label className="font-semibold font-inter">{label}</label>
        {forgotPasswordUrl && (
          <a
            href={forgotPasswordUrl}
            className="text-sm text-customBlue hover:underline font-inter"
          >
            Forgot your password?
          </a>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInputField;
