import React from 'react';
import { LoginForm } from '../features/auth/components/LoginForm';

// The Login Page wrapper
export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-main flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
};
