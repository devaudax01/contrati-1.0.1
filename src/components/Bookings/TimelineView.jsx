import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TimelineView({ bookings }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Month Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevMonth}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium text-gray-900">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="p-4">
        <div className="grid grid-cols-[200px_1fr] gap-4">
          {/* Booking Labels */}
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {booking.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{booking.carName}</p>
                  <p className="text-xs text-gray-500">{booking.customerName}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Bars */}
          <div className="relative">
            <div className="grid grid-cols-[repeat(31,minmax(30px,1fr))] mb-4">
              {Array.from({ length: 31 }, (_, i) => (
                <div key={i} className="text-xs text-gray-500 text-center">
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="relative h-10">
                  <div
                    className={`absolute h-8 rounded-md ${booking.color} bg-opacity-90 text-white text-xs flex items-center px-3`}
                    style={{
                      left: `${(new Date(booking.startDate).getDate() - 1) * (100 / 31)}%`,
                      width: `${((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24) + 1) * (100 / 31)}%`
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{booking.customerName}</span>
                      <div className="flex -space-x-2">
                        {booking.team.map((member, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-[repeat(31,1fr)]">
              {Array.from({ length: 31 }, (_, i) => (
                <div key={i} className="border-l border-gray-100" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 