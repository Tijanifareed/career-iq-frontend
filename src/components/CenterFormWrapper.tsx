import React from "react";

interface FormWrapperProps {
  children: React.ReactNode;
  title?: string;
  logoSrc?: string; 
}

const CenterFormWrapper: React.FC<FormWrapperProps> = ({ children, title, logoSrc }) => {
  return (
    <div className="flex min-h-screen items-start justify-center md:items-center bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white border border-neutral-200 rounded-lg shadow-sm mt-6 md:mt-0">
        {title && (
          <div className="flex items-center justify-center mb-4 ">
            {logoSrc && (
              <img src={logoSrc} alt="Logo" className="h-11 w-auto" />
            )}
            <h2 className="text-2xl font-bold font-inter text-customBlue italic">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default CenterFormWrapper;
