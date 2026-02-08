import React from 'react';

const CircularProgress = ({ percentage, size = 60, strokeWidth = 6, showLabel = true, darkMode = false }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className={darkMode ? "text-gray-700" : "text-gray-200"}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-emerald-500 transition-all duration-1000"
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{percentage}%</span>
                </div>
            )}
        </div>
    );
};

export default CircularProgress;
