import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => 
    api.put(`/auth/reset-password/${token}`, { password }),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerification: (email) => 
    api.post('/auth/resend-verification', { email }),
};

// Events API calls
export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (eventData) => api.post('/events', eventData),
  update: (id, eventData) => api.put(`/events/${id}`, eventData),
  delete: (id) => api.delete(`/events/${id}`),
  join: (id) => api.post(`/events/${id}/join`),
  leave: (id) => api.post(`/events/${id}/leave`),
  getAttendees: (id) => api.get(`/events/${id}/attendees`),
};

// Sermons API calls
export const sermonsAPI = {
  getAll: (params) => api.get('/sermons', { params }),
  getById: (id) => api.get(`/sermons/${id}`),
  create: (sermonData) => api.post('/sermons', sermonData),
  update: (id, sermonData) => api.put(`/sermons/${id}`, sermonData),
  delete: (id) => api.delete(`/sermons/${id}`),
  incrementViews: (id) => api.post(`/sermons/${id}/view`),
};

// Community Groups API calls
export const groupsAPI = {
  getAll: () => api.get('/groups'),
  getById: (id) => api.get(`/groups/${id}`),
  create: (groupData) => api.post('/groups', groupData),
  update: (id, groupData) => api.put(`/groups/${id}`, groupData),
  delete: (id) => api.delete(`/groups/${id}`),
  join: (id) => api.post(`/groups/${id}/join`),
  leave: (id) => api.post(`/groups/${id}/leave`),
};

// Gallery API calls
export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  create: (galleryData) => api.post('/gallery', galleryData),
  update: (id, galleryData) => api.put(`/gallery/${id}`, galleryData),
  delete: (id) => api.delete(`/gallery/${id}`),
  upload: (formData) => 
    api.post('/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

// Users API calls (Admin only)
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
};

// Search API calls
export const searchAPI = {
  search: (query, filters) => api.get('/search', { params: { q: query, ...filters } }),
  suggestions: (query) => api.get('/search/suggestions', { params: { q: query } }),
};

// Contact API calls
export const contactAPI = {
  send: (messageData) => api.post('/contact', messageData),
  getAll: () => api.get('/contact'),
  markAsRead: (id) => api.put(`/contact/${id}/read`),
  delete: (id) => api.delete(`/contact/${id}`),
};

// Analytics API calls (Admin only)
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getEvents: (period) => api.get('/analytics/events', { params: { period } }),
  getUsers: (period) => api.get('/analytics/users', { params: { period } }),
  getSermons: (period) => api.get('/analytics/sermons', { params: { period } }),
};

export default api;