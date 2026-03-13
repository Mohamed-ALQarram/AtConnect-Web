import React from 'react';
import { RegisterForm } from '../features/auth/components/RegisterForm';

// The Register Page wrapper
export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-main flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
};
