// import React from "react";

// interface InputFieldProps {
//      label: string;
//      value: string;
//      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//      type?: string;
//      placeholder?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({
//      label,
//      value,
//      onChange,
//      type = "text",
//      placeholder = "",
// }) => {
//      return (
//           <div className="mb-4">
//                <label className="block mb-1 font-semibold font-inter font-sm">{label}</label>

//                <input
//                     type={type}
//                     value={value}
//                     onChange={onChange}
//                     placeholder={placeholder}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
//                />
//           </div>
//      );
// };

// export default InputField;


import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // make optional
  type?: string;
  placeholder?: string;
  readOnly?: boolean; // new prop
  disabled?: boolean; // optional: disable input entirely
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  readOnly = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold font-inter font-sm">{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue 
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
    </div>
  );
};

export default InputField;
