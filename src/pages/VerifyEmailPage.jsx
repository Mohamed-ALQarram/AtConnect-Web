import React from 'react';
import { VerifyOTP } from '../features/auth/components/VerifyOTP';

// The OTP Verification Page wrapper
export const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen bg-main flex items-center justify-center p-4">
      <VerifyOTP />
    </div>
  );
};
