import axios from 'axios';
import { useAuthStore } from '../features/auth/stores/useAuthStore';

// Main Axios instance for API requests
export const api = axios.create({
  baseURL: 'https://atconnect.runasp.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh token requests at the exact same time
let isRefreshing = false;
let failedQueue = [];

// Helper to run queued requests once the refresh token is newly acquired
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Add the Bearer token to every request if it exists
api.interceptors.request.use(
  (config) => {
    // Get the current token from the Zustand store
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized errors and automatically retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 (Unauthorized) and we have not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {

      // If a refresh is already in progress, put this request in a queue
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      // Mark request as retrying and flag that we are refreshing
      originalRequest._retry = true;
      isRefreshing = true;

      // Get the current tokens from Zustand
      const { accessToken, refreshToken, setCredentials, clearCredentials } = useAuthStore.getState();

      try {
        // Make the API call to refresh the token using a raw axios instance to avoid loops
        const { data } = await axios.post('https://localhost:7217/api/Account/RefreshToken', {
          oldToken: accessToken,
          refreshToken: refreshToken
        });

        // Check standard wrapper response: { success, message, data }
        if (data.success && data.data) {
          const newAccessToken = data.data.accessToken;
          const newRefreshToken = data.data.refreshToken;

          // Get the current user so we don't lose them
          const { user } = useAuthStore.getState();

          // Save the new tokens back to Zustand
          setCredentials(user, newAccessToken, newRefreshToken);

          // Run previously failed requests with the new token
          processQueue(null, newAccessToken);

          // Retry this original request
          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          return api(originalRequest);
        } else {
          throw new Error('Refresh token request was not successful');
        }
      } catch (refreshError) {
        // If the refresh call fails, clear the store and push them to Login
        processQueue(refreshError, null);
        clearCredentials();

        // A simple redirect to login page
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Pass the error back if it's not a 401
    return Promise.reject(error);
  }
);
