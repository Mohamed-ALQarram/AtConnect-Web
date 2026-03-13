import { useState } from 'react';
import { register } from '../api/authApi';

// Custom hook to handle user registration
export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (userData) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    
    try {
      const result = await register(userData);
      
      if (result.success && result.data) {
        // If registration is successful, the backend sends an OTP email. 
        // The user is not fully logged in yet.
        return { success: true, data: result.data, message: result.message };
      } else {
        setError(result.message || 'Unable to register your account.');
        return { success: false, message: result.message };
      }
    } catch (err) {
      // Find a clean error message to show the user
      let message = 'An unexpected error occurred during registration.';
      
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
      setIsLoading(false); // Stop loading
    }
  };

  return { execute, isLoading, error };
};
