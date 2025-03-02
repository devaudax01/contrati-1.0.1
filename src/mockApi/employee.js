// Mock data for employee dashboard
const mockRentals = [
  {
    id: 1,
    customerName: "Mike Brown",
    equipment: "Canon EOS R5",
    startDate: "2024-03-01",
    endDate: "2024-03-05",
    status: "Active",
    price: 500
  },
  {
    id: 2,
    customerName: "Sarah Davis",
    equipment: "Sony A7III",
    startDate: "2024-03-10",
    endDate: "2024-03-15",
    status: "Pending",
    price: 400
  }
];

const mockStats = {
  totalRentals: 45,
  activeRentals: 8,
  completedRentals: 37,
  monthlyRevenue: 12500
};

export const getEmployeeRentals = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    success: true,
    data: mockRentals
  };
};

export const getEmployeeStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    success: true,
    data: mockStats
  };
};

export const updateRentalStatus = async (rentalId, status) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const rental = mockRentals.find(r => r.id === rentalId);
  if (!rental) {
    throw new Error('Rental not found');
  }
  rental.status = status;
  
  // Update stats based on status change
  if (status === 'Completed') {
    mockStats.completedRentals += 1;
    mockStats.activeRentals -= 1;
  } else if (status === 'Active') {
    mockStats.activeRentals += 1;
  }
  
  return {
    success: true,
    data: rental
  };
};

export const createRental = async (rentalData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newRental = {
    id: mockRentals.length + 1,
    ...rentalData,
    status: "Pending"
  };
  mockRentals.push(newRental);
  mockStats.totalRentals += 1;
  return {
    success: true,
    data: newRental
  };
}; 