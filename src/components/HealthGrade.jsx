import React from 'react';

const HealthGrade = ({ grade, type }) => {
  if (!grade) return null;

  let ringColor = "border-gray-200 text-gray-400";
  if (grade === "A") ringColor = "border-green-500 text-green-600";
  if (grade === "B" || grade === "C") ringColor = "border-orange-400 text-orange-500";
  if (grade === "-") ringColor = "border-gray-300 text-gray-400";

  return (
    <div className="flex items-center gap-1">
      {type === 'cloud' ? (
        <svg
          className="w-4 h-4 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {/* Official Lucide Cloud Icon Path */}
          <path d="M17.5 19a4.5 4.5 0 0 0-1-8.9 7 7 0 0 0-13 2A4 4 0 0 0 4 19h13.5z" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {/* Lucide "Server" icon (your device icon fallback) */}
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      )}
      
      <div
        className={`w-6 h-6 rounded-full border ${ringColor} flex items-center justify-center text-[10px] font-bold bg-white`}
      >
        {grade}
      </div>
    </div>
  );
};

export default HealthGrade;
