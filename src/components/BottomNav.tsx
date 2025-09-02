import React from "react";
import { FaHome, FaListAlt, FaFileAlt, FaComments, FaStream, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const items = [
  { id: "dashboard", label: "Home", icon: <FaHome />, path: "/dashboard" },
  { id: "apps", label: "Apps", icon: <FaListAlt />, path: "/applications" },
  { id: "resume", label: "Resume", icon: <FaFileAlt />, path: "/resume" },
  { id: "chat", label: "Chat", icon: <FaComments />, path: "/interview" },
  { id: "timeline", label: "Timeline", icon: <FaStream />, path: "/timeline" },
  { id: "profile", label: "Profile", icon: <FaUser />, path: "/profile" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-between px-2 py-2">
        {items.map((it) => (
          <button key={it.id} onClick={() => navigate(it.path)} className="flex-1 flex flex-col items-center justify-center py-1">
            <div className="text-lg">{it.icon}</div>
            <div className="text-xs text-gray-600 mt-1">{it.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}