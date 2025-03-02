import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Clock, User, Link2, Save, X } from 'lucide-react';

export const EditableCard = ({
  title,
  subtitle,
  status,
  date,
  details,
  tags = [],
  assignee,
  reference,
  actions,
  children,
  onSave,
  onCancelEdit,
  isEditing = false,
  editableFields = ['title', 'subtitle', 'status', 'tags', 'assignee', ...Object.keys(details || {})]
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedData, setEditedData] = useState({
    title,
    subtitle,
    status,
    tags,
    assignee,
    ...details
  });

  useEffect(() => {
    if (!isEditing) {
      setEditedData({
        title,
        subtitle,
        status,
        tags,
        assignee,
        ...details
      });
    }
  }, [isEditing, title, subtitle, status, tags, assignee, details]);

  const getStatusColor = (status) => {
    const statusColors = {
      active: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200',
      inactive: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200',
      pending: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200',
      paid: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200',
      unpaid: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200',
      expired: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200',
      open: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200',
      closed: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200'
    };
    return statusColors[status?.toLowerCase()] || 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200';
  };

  const handleCancel = () => {
    setEditedData({
      title,
      subtitle,
      status,
      tags,
      assignee,
      ...details
    });
    onCancelEdit?.();
  };

  const handleSave = async () => {
    try {
      await onSave(editedData);
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderEditableField = (field, value, type = 'text') => {
    if (!editableFields.includes(field)) {
      return <span className="text-sm text-gray-900">{value}</span>;
    }

    if (!isEditing) {
      return <span className="text-sm text-gray-900">{value}</span>;
    }

    switch (type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500"
            rows={3}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        );
      case 'tags':
        return (
          <input
            value={value.join(', ')}
            onChange={(e) => handleChange(field, e.target.value.split(', ').filter(Boolean))}
            className="w-full px-2 py-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500"
            placeholder="Tag1, Tag2, Tag3"
          />
        );
      default:
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500"
          />
        );
    }
  };

  return (
    <div className={`
      bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden
      hover:shadow-md hover:border-gray-300 transition-all duration-300
      ${isExpanded ? 'ring-1 ring-indigo-100' : ''}
    `}>
      {/* Card Header - Single line when collapsed */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 min-w-0 flex-1">
            {/* Title and Reference */}
            <div className="flex items-center space-x-3 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {isEditing ? renderEditableField('title', editedData.title) : title}
              </h3>
              {reference && (
                <span className="flex items-center text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  <Link2 className="h-4 w-4 mr-1 opacity-50" />
                  {reference}
                </span>
              )}
            </div>

            {/* Status */}
            {status && !isExpanded && (
              <span className={`
                inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                backdrop-blur-sm backdrop-saturate-200
                ${getStatusColor(status)}
              `}>
                {status}
              </span>
            )}

            {/* Assignee */}
            {assignee && !isExpanded && (
              <span className="inline-flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                <User className="h-4 w-4 mr-2 opacity-50" />
                {assignee}
              </span>
            )}

            {/* Date */}
            {date && !isExpanded && (
              <span className="inline-flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4 mr-2 opacity-50" />
                {new Date(date).toLocaleDateString()}
              </span>
            )}

            {/* Tags - Limited to first 2 when collapsed */}
            {tags.length > 0 && !isExpanded && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center -space-x-1">
                  {tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-100
                        hover:from-indigo-100 hover:to-blue-100 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {tags.length > 2 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                      +{tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-1">
                {actions}
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {subtitle && (
              <div className="text-gray-600">
                {isEditing ? renderEditableField('subtitle', editedData.subtitle, 'textarea') : subtitle}
              </div>
            )}
            
            {/* Meta information when expanded */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              {status && (
                <div>
                  {renderEditableField('status', editedData.status, 'select')}
                </div>
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
                  {renderEditableField('assignee', editedData.assignee)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
            {details && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <dt className="text-sm font-medium text-gray-500 min-w-[120px]">
                      {key}:
                    </dt>
                    <dd className="text-sm text-gray-900 ml-2">
                      {renderEditableField(key, editedData[key])}
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