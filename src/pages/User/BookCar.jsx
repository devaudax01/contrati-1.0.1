import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { 
  Calendar,
  MapPin,
  Search,
  Filter,
  Car,
  Users,
  Fuel,
  Settings,
  DollarSign,
  Star
} from 'lucide-react';

export default function BookCar() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    startDate: '',
    endDate: '',
    carType: 'all'
  });

  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    transmission: 'all',
    fuelType: 'all',
    seats: 'all'
  });

  // Mock data - replace with actual API calls
  const availableCars = [
    {
      id: 1,
      name: "Tesla Model 3",
      type: "Electric",
      price: 89,
      image: "/cars/tesla-model-3.jpg",
      transmission: "Automatic",
      seats: 5,
      fuelType: "Electric",
      rating: 4.8,
      features: ["Autopilot", "Premium Sound", "360° Camera"],
      available: true
    },
    {
      id: 2,
      name: "BMW 3 Series",
      type: "Sedan",
      price: 75,
      image: "/cars/bmw-3.jpg",
      transmission: "Automatic",
      seats: 5,
      fuelType: "Petrol",
      rating: 4.6,
      features: ["Leather Seats", "GPS", "Bluetooth"],
      available: true
    },
    {
      id: 3,
      name: "Mercedes GLC",
      type: "SUV",
      price: 95,
      image: "/cars/mercedes-glc.jpg",
      transmission: "Automatic",
      seats: 5,
      fuelType: "Diesel",
      rating: 4.7,
      features: ["4x4", "Panoramic Roof", "Premium Audio"],
      available: true
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic
    console.log('Search params:', searchParams);
  };

  const handleBooking = (carId) => {
    // Implement booking logic
    console.log('Booking car:', carId);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Book a Car</h1>
          <p className="mt-2 text-gray-600">Search and book from our wide range of vehicles</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pick-up location"
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchParams.startDate}
                  onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchParams.endDate}
                  onChange={(e) => setSearchParams({ ...searchParams, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Type
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchParams.carType}
                onChange={(e) => setSearchParams({ ...searchParams, carType: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="electric">Electric</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search Available Cars
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (€/day)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    className="w-full"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [0, parseInt(e.target.value)]
                    })}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>€0</span>
                    <span>€{filters.priceRange[1]}</span>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300"
                    value={filters.transmission}
                    onChange={(e) => setFilters({
                      ...filters,
                      transmission: e.target.value
                    })}
                  >
                    <option value="all">All</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300"
                    value={filters.fuelType}
                    onChange={(e) => setFilters({
                      ...filters,
                      fuelType: e.target.value
                    })}
                  >
                    <option value="all">All</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seats
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300"
                    value={filters.seats}
                    onChange={(e) => setFilters({
                      ...filters,
                      seats: e.target.value
                    })}
                  >
                    <option value="all">All</option>
                    <option value="2">2 Seats</option>
                    <option value="4">4 Seats</option>
                    <option value="5">5 Seats</option>
                    <option value="7">7+ Seats</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Car List */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCars.map((car) => (
                <div key={car.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Car Image */}
                  <div className="h-48 w-full bg-gray-200">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=Car+Image';
                      }}
                    />
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                        <p className="text-sm text-gray-500">{car.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">€{car.price}</p>
                        <p className="text-sm text-gray-500">per day</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{car.rating}</span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Settings className="h-4 w-4 mr-2" />
                        {car.transmission}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        {car.seats} Seats
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Fuel className="h-4 w-4 mr-2" />
                        {car.fuelType}
                      </div>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {car.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleBooking(car.id)}
                      disabled={!car.available}
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium
                        ${car.available
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {car.available ? 'Book Now' : 'Not Available'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {availableCars.length === 0 && (
              <div className="text-center py-12">
                <Car className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No cars available</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 