import React from 'react';
import { useNavigate } from 'react-router-dom';

const TabSwitcher = ({ activeTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { label: 'Login', route: '/login' },
    { label: 'Sign Up', route: '/signup' },
  ];

  return (
    <div className="flex justify-center mb-6 space-x-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.label;
        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.route)}
            className={`px-16 py-2 rounded-md font-semibold transition-colors ${
              isActive
                ? 'bg-[#5795c2] text-white font-inter text-sm'
                : 'bg-transparent text-gray-700 hover:bg-gray-200 font-inter text-sm'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitcher;
