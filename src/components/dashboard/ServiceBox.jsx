import React from 'react';

export const ServiceBox = ({ title, value, bgColor = 'bg-blue-50' }) => {
  return (
    <div className={`${bgColor} rounded-xl p-4`}>
      <h4 className="text-sm font-medium text-gray-600">{title}</h4>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}; 