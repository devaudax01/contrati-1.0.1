import React from 'react';

export const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <dt className="text-sm font-medium text-gray-500">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
        <dd className="mt-2 text-sm text-gray-500">{subtitle}</dd>
      </div>
    </div>
  );
}; 