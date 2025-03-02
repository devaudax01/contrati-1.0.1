import React from 'react';

export const InstanceCard = ({ id, name, launchDate, status }) => {
  const getStatusStyles = (status) => {
    const styles = {
      running: 'bg-red-100 text-red-600',
      stopped: 'bg-gray-100 text-gray-600',
      pending: 'bg-yellow-100 text-yellow-600'
    };
    return styles[status] || styles.stopped;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-lg font-semibold">{name}</h4>
            <p className="text-sm text-gray-500">ID: {id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyles(status)}`}>
            {status.toUpperCase()}
          </span>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500">Launch Date</p>
          <p className="font-medium">{new Date(launchDate).toLocaleDateString()}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Ignore
          </button>
          <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}; 