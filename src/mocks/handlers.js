import { http, HttpResponse } from 'msw'
import mockData from './data.json'
import { mockCustomers, mockEmployees } from '../utils/mockData'
import { rest } from 'msw'

const { users, customers, employees, vehicles, bookings, subscriptionPlans } = mockData;

export const handlers = [
  // Auth endpoints - match the paths in authService.js
  http.post('/auth/login', async ({ request }) => {
    const body = await request.json();
    
    // Check both customers and employees for login
    const customer = mockCustomers.find(c => c.email === body.email);
    const employee = mockEmployees.find(e => e.email === body.email);
    const user = customer || employee;
    
    if (user && body.password === 'password') {
      return HttpResponse.json({
        user,
        token: 'mock-jwt-token'
      }, { status: 200 });
    }
    
    return new HttpResponse(null, { 
      status: 401,
      statusText: 'Invalid credentials'
    });
  }),

  http.post('/auth/logout', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get('/auth/me', () => {
    return HttpResponse.json(mockCustomers[0]);
  }),

  http.put('/auth/profile', async ({ request }) => {
    const updates = await request.json();
    return HttpResponse.json({
      ...mockCustomers[0],
      ...updates
    });
  }),

  // Vehicle endpoints
  http.get('/api/vehicles', () => {
    return HttpResponse.json(vehicles);
  }),

  http.get('/api/vehicles/:id', ({ params }) => {
    const vehicle = vehicles.find(v => v.id === parseInt(params.id));
    if (!vehicle) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(vehicle);
  }),

  http.post('/api/vehicles', async ({ request }) => {
    const body = await request.json();
    const newVehicle = { ...body, id: vehicles.length + 1 };
    return HttpResponse.json(newVehicle);
  }),

  http.put('/api/vehicles/:id', async ({ params, request }) => {
    const body = await request.json();
    const vehicle = vehicles.find(v => v.id === parseInt(params.id));
    if (!vehicle) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({ ...vehicle, ...body });
  }),

  http.delete('/api/vehicles/:id', ({ params }) => {
    const vehicle = vehicles.find(v => v.id === parseInt(params.id));
    if (!vehicle) return new HttpResponse(null, { status: 404 });
    return new HttpResponse(null, { status: 200 });
  }),

  // Booking endpoints
  http.get('/api/bookings', () => {
    return HttpResponse.json(bookings);
  }),

  http.get('/api/bookings/:id', ({ params }) => {
    const booking = bookings.find(b => b.id === parseInt(params.id));
    if (!booking) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(booking);
  }),

  http.post('/api/bookings', async ({ request }) => {
    const body = await request.json();
    const newBooking = { ...body, id: bookings.length + 1 };
    return HttpResponse.json(newBooking);
  }),

  http.put('/api/bookings/:id', async ({ params, request }) => {
    const body = await request.json();
    const booking = bookings.find(b => b.id === parseInt(params.id));
    if (!booking) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({ ...booking, ...body });
  }),

  http.delete('/api/bookings/:id', ({ params }) => {
    const booking = bookings.find(b => b.id === parseInt(params.id));
    if (!booking) return new HttpResponse(null, { status: 404 });
    return new HttpResponse(null, { status: 200 });
  }),

  // User endpoints
  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  http.get('/api/users/:id', ({ params }) => {
    const user = users.find(u => u.id === parseInt(params.id));
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    const body = await request.json();
    const user = users.find(u => u.id === parseInt(params.id));
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({ ...user, ...body });
  }),

  // Admin endpoints
  http.get('/api/admin/stats', () => {
    return HttpResponse.json({
      success: true,
      data: {
        totalCustomers: 150,
        totalVehicles: 45,
        totalRevenue: 25000,
        activeRentals: 12
      }
    });
  }),

  http.get('/api/admin/customers', () => {
    return HttpResponse.json({
      success: true,
      data: customers
    });
  }),

  http.get('/api/admin/subscription-plans', () => {
    return HttpResponse.json({
      success: true,
      data: subscriptionPlans
    });
  }),

  // Owner endpoints
  http.get('/api/owner/fleet', () => {
    return HttpResponse.json({
      success: true,
      data: vehicles
    });
  }),

  http.get('/api/owner/bookings', () => {
    return HttpResponse.json({
      success: true,
      data: bookings
    });
  }),

  http.get('/api/owner/customers', () => {
    return HttpResponse.json({
      success: true,
      data: customers
    });
  }),

  http.get('/api/owner/employees', () => {
    return HttpResponse.json({
      success: true,
      data: employees
    });
  }),

  http.post('/api/owner/employees', async ({ request }) => {
    const employee = await request.json();
    return HttpResponse.json({
      success: true,
      data: { ...employee, id: Date.now() }
    });
  }),

  http.put('/api/owner/employees/:id', async ({ params, request }) => {
    const updates = await request.json();
    return HttpResponse.json({
      success: true,
      data: { ...updates, id: params.id }
    });
  }),

  http.post('/api/owner/bookings', async ({ request }) => {
    const booking = await request.json();
    return HttpResponse.json({
      success: true,
      data: { ...booking, id: Date.now() }
    });
  }),

  // Business Profile endpoints
  http.post('/api/owner/business-profile', async ({ request }) => {
    const profile = await request.json();
    return HttpResponse.json({
      success: true,
      data: profile
    });
  }),

  // Employee endpoints
  http.get('/api/employee/rentals', () => {
    return HttpResponse.json({
      success: true,
      data: bookings
    });
  }),

  http.get('/api/employee/stats', () => {
    return HttpResponse.json({
      success: true,
      data: {
        totalRentals: 45,
        activeRentals: 12,
        revenue: 15000,
        customerSatisfaction: 4.5
      }
    });
  }),

  // Error handling example
  http.get('/api/error-example', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }),

  // Add your mock API handlers here
  rest.get('/api/example', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Mocked response'
      })
    );
  }),
]; 