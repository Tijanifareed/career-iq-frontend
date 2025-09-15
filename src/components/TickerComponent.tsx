import React, { useEffect, useState } from "react";
import api from "../apis/api";

const motivationalQuotes = [
  "Stay positive, work hard, make it happen 💪",
  "Your dream job is closer than you think 🚀",
  "Every rejection is redirection 🔄",
  "Consistency beats intensity 🌱",
  "Believe in yourself — recruiters can tell 🌟",
];

const Ticker: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get("/users/upcoming-interview");
        if (res.data?.message) {
          // If backend gives an interview → only show that
          setMessages([res.data.message]);
        } else {
          // Otherwise → shuffle quotes for variety
          setMessages([...motivationalQuotes].sort(() => Math.random() - 0.5));
        }
      } catch (err) {
        console.error("Failed to fetch interview:", err);
        // fallback to quotes
        setMessages([...motivationalQuotes].sort(() => Math.random() - 0.5));
      }
    };

    fetchMessage();
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, 4000); // 4 seconds
      return () => clearInterval(interval);
    }
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div className="overflow-hidden w-[400px] whitespace-nowrap">
      <div
        key={currentIndex}
        className="animate-slide text-sm text-gray-700"
      >
        {messages[currentIndex]}
      </div>

      {/* animation styles */}
      <style>
        {`
          @keyframes slide {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide {
            animation: slide 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Ticker;
