// Mock data for owner dashboard
const mockBusiness = {
  id: 1,
  name: "Photo Studio A",
  subscription: "Premium",
  expiryDate: "2024-12-31",
  status: "Active",
  statistics: {
    totalRentals: 150,
    activeRentals: 25,
    revenue: 15000
  }
};

const mockEmployees = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@photostudioa.com",
    role: "Manager",
    rentalsHandled: 45,
    status: "Active"
  },
  {
    id: 2,
    name: "Bob Wilson",
    email: "bob@photostudioa.com",
    role: "Staff",
    rentalsHandled: 30,
    status: "Active"
  }
];

export const getBusiness = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (!mockBusiness) {
    throw new Error('Business not found');
  }
  return {
    success: true,
    data: mockBusiness
  };
};

export const getEmployees = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    success: true,
    data: mockEmployees
  };
};

export const addEmployee = async (employeeData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newEmployee = {
    id: mockEmployees.length + 1,
    ...employeeData,
    rentalsHandled: 0,
    status: "Active"
  };
  mockEmployees.push(newEmployee);
  return {
    success: true,
    data: newEmployee
  };
};

export const updateEmployeeStatus = async (employeeId, status) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const employee = mockEmployees.find(e => e.id === employeeId);
  if (!employee) {
    throw new Error('Employee not found');
  }
  employee.status = status;
  return {
    success: true,
    data: employee
  };
}; 