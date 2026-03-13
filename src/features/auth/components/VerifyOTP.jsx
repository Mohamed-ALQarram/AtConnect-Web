import React, { useState, useRef } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import { useNavigate, useLocation } from 'react-router-dom';

// The OTP verification screen shown after registration
export const VerifyOTP = () => {
  // An array of 6 empty strings for our 6 boxes
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  
  const { execute, isLoading, error } = useVerifyEmail();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the email from the previous screen (Register)
  const email = location.state?.email || '';

  // Handle typing inside a box
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    // take only the last character typed
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input box if there is a next one
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    // Move backward if they hit backspace inside an empty box
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle Pasting the whole code at once
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return; // Must be numbers

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    
    // Focus the next empty box or the last box
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex].focus();
  };

  // Handle clicking verify
  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return; // Wait until all 6 are filled
    
    const result = await execute(email, otpString);
    if (result.success) {
      // Worked! Go to Home.
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-sm bg-surface rounded-24 p-8 shadow-xl border border-dark flex flex-col items-center mx-auto text-center">
      {/* Top Icon */}
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
        <Mail size={32} />
      </div>
      
      {/* Details */}
      <h2 className="text-2xl font-bold text-text-main mb-2">Verify Your Account</h2>
      <p className="text-sm text-text-muted mb-8 px-2">
        We sent a 6-digit verification code to your email. Please enter it below to secure your account.
      </p>

      {/* Error Box */}
      {error && (
        <div className="w-full bg-danger/10 border border-danger/20 text-danger text-sm p-3 rounded-16 mb-4">
          {error}
        </div>
      )}

      {/* The 6 OTP Boxes */}
      <div className="flex justify-center gap-2 w-full mb-8" onPaste={handlePaste}>
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            className="w-12 h-14 bg-main rounded-16 border border-dark text-center text-lg text-text-main font-bold focus:outline-none focus:border-primary transition-colors"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
          />
        ))}
      </div>

      {/* Action Button */}
      <Button 
        onClick={handleSubmit} 
        isLoading={isLoading} 
        disabled={otp.join('').length !== 6} // Disabled if not full length
      >
        Verify Account →
      </Button>

      {/* Resend */}
      <div className="mt-8 text-sm text-text-muted">
        Didn't receive the code?{' '}
        <button className="text-primary font-semibold hover:underline focus:outline-none">
          Resend Code
        </button>
      </div>
    </div>
  );
};
