import { useState } from 'react';
import { Calendar, Info } from 'lucide-react';
import { BookingModal } from './BookingModal';
import { useVehicleStore } from '../stores/vehicleStore';
import { useBookingStore } from '../stores/bookingStore';

export const VehicleCard = ({ vehicle }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { setSelectedVehicle } = useVehicleStore();
  const { addBooking, isLoading } = useBookingStore();

  const handleBookClick = () => {
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
  };

  const handleBookingSubmit = async (formData) => {
    try {
      setSelectedVehicle(vehicle);
      await addBooking({
        ...formData,
        vehicleId: vehicle.id,
      });
      setShowBookingModal(false);
    } catch (error) {
      console.error('Error submitting booking:', error);
      throw error;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Vehicle Image */}
        <div className="aspect-video relative">
          <img
            src={vehicle.images[0] || '/placeholder-car.jpg'}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
            ${vehicle.dailyRate}/day
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          
          <div className="mt-2 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Info size={16} />
              <span>{vehicle.category} • {vehicle.transmission} • {vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Available at {vehicle.location}</span>
            </div>
          </div>

          {/* Features */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {vehicle.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleBookClick}
            disabled={vehicle.status !== 'available'}
            className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors
              ${vehicle.status === 'available'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {vehicle.status === 'available' ? 'Book Now' : 'Not Available'}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        show={showBookingModal}
        onClose={handleCloseModal}
        onSubmit={handleBookingSubmit}
        vehicleId={vehicle.id}
      />
    </>
  );
}; 