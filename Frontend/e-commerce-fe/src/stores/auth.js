import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token into request
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Token ${authStore.token}`; // Django Token Auth
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to resolve error response
api.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore();
    // If error is 401 Authorized and error not from /login
    if (error.response && error.response.status === 401 && !error.config.url.includes('/auth/login')) {
      console.warn('Unauthorized request. Logging out...');
      authStore.logout(); // Auto logout if token expired or is invalid
    }
    return Promise.reject(error);
  }
);

export default api;
