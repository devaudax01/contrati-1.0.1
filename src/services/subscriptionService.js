const API_URL = 'http://localhost:3000/api';

// Helper function for API calls
const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    mode: 'cors',
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

// Public routes
export const getSubscriptionPlans = () => {
  return fetchWithAuth('/subscriptions/plans');
};

export const getPlan = (planId) => {
  return fetchWithAuth(`/subscriptions/plans/${planId}`);
};

// Protected routes
export const createSubscription = (subscriptionData) => {
  return fetchWithAuth('/subscriptions', {
    method: 'POST',
    body: JSON.stringify(subscriptionData)
  });
};

export const getSubscription = (subscriptionId) => {
  return fetchWithAuth(`/subscriptions/${subscriptionId}`);
};

export const cancelSubscription = (subscriptionId) => {
  return fetchWithAuth(`/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST'
  });
};

// Admin-only routes
export const createPlan = (planData) => {
  return fetchWithAuth('/subscriptions/plans', {
    method: 'POST',
    body: JSON.stringify(planData)
  });
};

export const updatePlan = (planId, planData) => {
  return fetchWithAuth(`/subscriptions/plans/${planId}`, {
    method: 'PUT',
    body: JSON.stringify(planData)
  });
};

export const deletePlan = (planId) => {
  return fetchWithAuth(`/subscriptions/plans/${planId}`, {
    method: 'DELETE'
  });
};

export const updatePlanFeatures = (planId, featuresData) => {
  return fetchWithAuth(`/subscriptions/plans/${planId}/features`, {
    method: 'PATCH',
    body: JSON.stringify(featuresData)
  });
};

export const updatePlanPrice = (planId, priceData) => {
  return fetchWithAuth(`/subscriptions/plans/${planId}/price`, {
    method: 'PATCH',
    body: JSON.stringify(priceData)
  });
};

// Subscription management (admin)
export const getBusinessSubscriptions = (businessId) => {
  return fetchWithAuth(`/subscriptions/business/${businessId}`);
};

export const getActiveSubscriptions = () => {
  return fetchWithAuth('/subscriptions/active');
};

export const getExpiredSubscriptions = () => {
  return fetchWithAuth('/subscriptions/expired');
};

export const renewSubscription = (subscriptionId, renewData) => {
  return fetchWithAuth(`/subscriptions/${subscriptionId}/renew`, {
    method: 'POST',
    body: JSON.stringify(renewData)
  });
};

export const upgradePlan = (subscriptionId, upgradeData) => {
  return fetchWithAuth(`/subscriptions/${subscriptionId}/upgrade`, {
    method: 'POST',
    body: JSON.stringify(upgradeData)
  });
}; 