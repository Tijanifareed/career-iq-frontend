// components/FeedbackModal.tsx
import React from "react";

interface FeedbackModalProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ type, message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
        <h2 className={`text-xl font-bold mb-4 ${type === "success" ? "text-green-600" : "text-red-600"}`}>
          {type === "success" ? "Success!" : "Error!"}
        </h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-10 py-2 bg-customBlue text-white rounded-md hover:bg-customBlue transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
