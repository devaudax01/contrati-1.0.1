import { useState } from 'react';

export function BoardView({ bookings }) {
  const columns = [
    { id: 'upcoming', title: 'Upcoming', color: 'bg-yellow-50' },
    { id: 'active', title: 'Active', color: 'bg-blue-50' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map((column) => (
        <div key={column.id} className={`${column.color} rounded-lg p-4`}>
          <h3 className="font-medium text-gray-900 mb-4">{column.title}</h3>
          <div className="space-y-3">
            {bookings
              .filter((booking) => booking.status === column.id)
              .map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      {booking.customerName}
                    </h4>
                    <div className="flex -space-x-2">
                      {booking.team.map((member, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-medium text-white ring-2 ring-white"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{booking.carName}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(booking.startDate).toLocaleDateString()} - 
                    {new Date(booking.endDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
} 