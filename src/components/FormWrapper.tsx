
import React from "react";

interface FormWrapperProps {
  children: React.ReactNode;
  title?: string;
  logoSrc?: string; // optional logo URL
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, title, logoSrc }) => {
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white border border-neutral-60 rounded-lg">
      {title && (
        <div className="flex items-center justify-center mb-4 gap-1">
          {logoSrc && (
            <img src={logoSrc} alt="Logo" className="h-11 w-auto" />
          )}
          <h2 className="text-2xl font-bold font-inter text-customBlue italic ">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
};

export default FormWrapper;

