import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarView({ bookings }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {Array.from({ length: 42 }, (_, i) => {
            const dayNumber = i - firstDayOfMonth + 1;
            const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
            const dayBookings = bookings.filter(booking => {
              const date = new Date(booking.startDate);
              return date.getDate() === dayNumber &&
                     date.getMonth() === currentDate.getMonth() &&
                     date.getFullYear() === currentDate.getFullYear();
            });

            return (
              <div
                key={i}
                className={`bg-white p-2 min-h-[100px] ${
                  isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                <div className="font-medium mb-1">{isCurrentMonth ? dayNumber : ''}</div>
                {dayBookings.map(booking => (
                  <div
                    key={booking.id}
                    className={`${booking.color} text-white text-xs p-1 rounded mb-1 truncate`}
                  >
                    {booking.customerName}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 