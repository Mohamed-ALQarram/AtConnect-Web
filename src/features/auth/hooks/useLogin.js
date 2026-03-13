import { useState } from 'react';
import { login } from '../api/authApi';
import { useAuthStore } from '../stores/useAuthStore';

// Custom hook for the login feature
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get the action to save credentials directly from Zustand
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const execute = async (userNameOrEmail, password) => {
    setIsLoading(true);
    setError(null); // Clear old errors
    
    try {
      const result = await login(userNameOrEmail, password);
      
      if (result.success && result.data) {
        // Save some basic user info and tokens
        const user = { username: userNameOrEmail }; 
        setCredentials(user, result.data.accessToken, result.data.refreshToken);
        
        return { success: true, data: result.data };
      } else {
        // Backend returned success: false
        setError(result.message || 'Login failed, please check your credentials.');
        return { success: false, message: result.message };
      }
    } catch (err) {
      // Extract specific validation errors if they exist from the backend response
      let message = 'An unexpected error occurred during login.';
      
      if (err.response?.data) {
        const data = err.response.data;
        if (data.errors) {
          // ASP.NET Core validation errors format
          if (typeof data.errors === 'object' && !Array.isArray(data.errors)) {
            const firstKey = Object.keys(data.errors)[0];
            message = data.errors[firstKey][0];
          } else if (Array.isArray(data.errors) && data.errors.length > 0) {
            message = data.errors[0];
          }
        } else if (data.message) {
           message = data.message;
        } else if (data.title) {
           message = data.title;
        }
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false); // Done loading
    }
  };

  return { execute, isLoading, error };
};
