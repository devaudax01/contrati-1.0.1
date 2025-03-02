import React from 'react';

export const RecommendationCard = ({
  type,
  environment,
  instances,
  tenancy,
  os,
  region,
  savings
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-lg font-semibold">{type}</h4>
            <p className="text-sm text-gray-500">{environment}</p>
          </div>
          <span className="text-lg font-semibold text-green-600">{savings}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Instances</p>
            <p className="font-medium">{instances}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tenancy</p>
            <p className="font-medium">{tenancy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">OS</p>
            <p className="font-medium">{os}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Region</p>
            <p className="font-medium">{region}</p>
          </div>
        </div>

        <button className="w-full mt-4 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
          Buy Reserved Instance
        </button>
      </div>
    </div>
  );
}; 