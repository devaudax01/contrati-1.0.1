import { useState } from 'react';
import { X } from 'lucide-react';

export const MaintenanceModal = ({ show, onClose, onSubmit, availableCars }) => {
  const initialState = {
    carId: '',
    startDate: '',
    endDate: '',
    maintenanceType: 'routine', // routine, repair, inspection
    description: '',
    estimatedCost: '',
    provider: ''
  };

  const [maintenance, setMaintenance] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(maintenance);
    setMaintenance(initialState);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Schedule Maintenance</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle
              </label>
              <select
                required
                value={maintenance.carId}
                onChange={(e) => setMaintenance({
                  ...maintenance,
                  carId: e.target.value
                })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select a vehicle</option>
                {availableCars.map(car => (
                  <option key={car.id} value={car.id}>
                    {car.name} - {car.plate}
                  </option>
                ))}
              </select>
            </div>

            {/* Maintenance Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Type
              </label>
              <select
                required
                value={maintenance.maintenanceType}
                onChange={(e) => setMaintenance({
                  ...maintenance,
                  maintenanceType: e.target.value
                })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="routine">Routine Maintenance</option>
                <option value="repair">Repair</option>
                <option value="inspection">Inspection</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={maintenance.startDate}
                  onChange={(e) => setMaintenance({
                    ...maintenance,
                    startDate: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  required
                  value={maintenance.endDate}
                  min={maintenance.startDate}
                  onChange={(e) => setMaintenance({
                    ...maintenance,
                    endDate: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                value={maintenance.description}
                onChange={(e) => setMaintenance({
                  ...maintenance,
                  description: e.target.value
                })}
                className="w-full p-2 border rounded-lg h-24"
                placeholder="Describe the maintenance work..."
              />
            </div>

            {/* Provider and Cost */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Provider
                </label>
                <input
                  type="text"
                  value={maintenance.provider}
                  onChange={(e) => setMaintenance({
                    ...maintenance,
                    provider: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Garage or mechanic name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Cost
                </label>
                <input
                  type="number"
                  value={maintenance.estimatedCost}
                  onChange={(e) => setMaintenance({
                    ...maintenance,
                    estimatedCost: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Schedule Maintenance
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 