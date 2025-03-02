import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const DashboardCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  valueClassName = '' 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className={`text-2xl font-semibold mt-2 ${valueClassName}`}>{value}</p>
      {trend && trendValue && (
        <div className="flex items-center mt-2">
          {trend === 'up' ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ml-1 ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}; 