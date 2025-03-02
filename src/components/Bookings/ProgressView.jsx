export function ProgressView({ bookings }) {
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(b => b.status === 'active').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{totalBookings}</div>
            <div className="text-sm text-gray-500">Total Bookings</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{activeBookings}</div>
            <div className="text-sm text-gray-500">Active Bookings</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">{completedBookings}</div>
            <div className="text-sm text-gray-500">Completed Bookings</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Progress</h3>
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{booking.customerName}</span>
                <span className="text-gray-500">{booking.carName}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${booking.color}`}
                  style={{
                    width: booking.status === 'completed' ? '100%' : 
                           booking.status === 'active' ? '50%' : '25%'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 