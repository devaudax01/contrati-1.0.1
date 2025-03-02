import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Tag, User, Link2 } from 'lucide-react';

export const Card = ({ 
  title, 
  subtitle,
  status,
  date,
  details,
  tags = [],
  assignee,
  reference,
  actions,
  children 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      unpaid: 'bg-red-100 text-red-800 border-red-200',
      expired: 'bg-gray-100 text-gray-800 border-gray-200',
      open: 'bg-blue-100 text-blue-800 border-blue-200',
      closed: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-200">
      {/* Card Header - Always visible */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-medium text-gray-900 truncate hover:text-indigo-600 cursor-pointer">
                {title}
              </h3>
              {reference && (
                <div className="flex items-center text-sm text-gray-500">
                  <Link2 className="h-4 w-4 mr-1" />
                  {reference}
                </div>
              )}
            </div>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{subtitle}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex items-center space-x-3">
            {actions}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Meta information */}
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            {status && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                {status}
              </span>
            )}
            {date && (
              <span className="inline-flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(date).toLocaleDateString()}
              </span>
            )}
            {assignee && (
              <span className="inline-flex items-center">
                <User className="h-4 w-4 mr-1" />
                {assignee}
              </span>
            )}
          </div>
          {tags.length > 0 && (
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-4 bg-gray-50">
            {details && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <dt className="text-sm font-medium text-gray-500 min-w-[120px]">
                      {key}:
                    </dt>
                    <dd className="text-sm text-gray-900 ml-2">
                      {value}
                    </dd>
                  </div>
                ))}
              </div>
            )}
            {children && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                {children}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 