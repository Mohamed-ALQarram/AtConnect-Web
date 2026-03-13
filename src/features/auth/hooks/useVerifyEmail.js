import { useState } from 'react';
import { verifyEmail } from '../api/authApi';
import { useAuthStore } from '../stores/useAuthStore';

// Custom hook for checking the OTP code and logging in the user
export const useVerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Allows us to update the global Zustand state with tokens
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const execute = async (email, token) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await verifyEmail(email, token);
      
      if (result.success && result.data) {
        // Verification was successful, user is now logged in
        const user = { email }; // Save their email as basic user info
        setCredentials(user, result.data.accessToken, result.data.refreshToken);
        
        return { success: true, data: result.data };
      } else {
        // Keep the error simple
        setError(result.message || 'Verification failed. The code might be expired.');
        return { success: false, message: result.message };
      }
    } catch (err) {
      let message = 'We could not verify your email at this time.';
      
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
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
};
