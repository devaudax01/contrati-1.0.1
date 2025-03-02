// Mock user data
const mockUsers = {
  'admin@test.com': {
    success: true,
    data: {
      token: 'mock-admin-token',
      user: {
        id: 1,
        email: 'admin@test.com',
        role: 'ADMIN',
        name: 'Admin User',
        status: 'Active'
      }
    }
  },
  'owner@test.com': {
    success: true,
    data: {
      token: 'mock-owner-token',
      user: {
        id: 2,
        email: 'owner@test.com',
        role: 'OWNER',
        name: 'Business Owner',
        status: 'Active'
      }
    }
  },
  'employee@test.com': {
    success: true,
    data: {
      token: 'mock-employee-token',
      user: {
        id: 3,
        email: 'employee@test.com',
        role: 'EMPLOYEE',
        name: 'Employee User',
        status: 'Active'
      }
    }
  }
};

export const mockLogin = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simulate random network errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Network error');
  }

  const response = mockUsers[email];
  if (!response) {
    throw new Error('Invalid credentials');
  }

  return response;
};

export const mockLogout = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { success: true };
};

export const mockCheckAuth = async (token) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Validate token format
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token');
  }

  // Find user by token
  const user = Object.values(mockUsers).find(
    u => u.data.token === token
  );

  if (!user) {
    throw new Error('Invalid token');
  }

  return user;
};

export const mockResetPassword = async (email) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!mockUsers[email]) {
    throw new Error('User not found');
  }

  return {
    success: true,
    message: 'Password reset link sent'
  };
}; 