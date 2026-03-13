import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Mail } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

// The main registration form
export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { execute, isLoading, error } = useRegister();
  const navigate = useNavigate();

  // Handle typing in any input field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Called when the user clicks 'Create account'
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing
    
    const result = await execute(formData);
    
    if (result.success) {
      // Sent email OTP, now go to verify page.
      // We pass the email in the state so the next page knows who we are verifying!
      navigate('/verify-email', { state: { email: formData.email } });
    }
  };

  return (
    <div className="w-full max-w-md bg-card rounded-24 p-8 shadow-xl border border-dark flex flex-col items-center mx-auto">
      {/* Logo & Brand */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          @
        </div>
        <h1 className="text-xl font-bold text-text-main">AtConnect</h1>
      </div>
      
      {/* Title */}
      <h2 className="text-2xl font-bold text-text-main mb-2">Create Account</h2>
      <p className="text-sm text-text-muted mb-8 text-center">
        Connect with the future of networking.
      </p>
      
      {/* Error Message */}
      {error && (
        <div className="w-full bg-danger/10 border border-danger/20 text-danger text-sm p-3 rounded-16 mb-4 text-center">
          {error}
        </div>
      )}
      
      {/* The form box */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        
        {/* Name Fields Side by Side */}
        <div className="flex gap-4 w-full">
          <Input
            label="First name"
            name="firstName"
            type="text"
            placeholder="First name"
            icon={User}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last name"
            name="lastName"
            type="text"
            placeholder="Last name"
            icon={User}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        
        <Input
          label="Username"
          name="userName"
          type="text"
          placeholder="Enter your username"
          icon={User}
          value={formData.userName}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          required
          rightIcon={
            <button
              type="button"
              onClick={handleTogglePassword}
              className="text-text-muted hover:text-text-main transition-colors focus:outline-none flex items-center justify-center"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />
        
        {/* Our generic button handling loading internally */}
        <Button type="submit" isLoading={isLoading} className="mt-4">
          Create account
        </Button>
      </form>
      
      {/* Login Link */}
      <div className="mt-8 text-sm text-text-muted">
        Already had account?{' '}
        <button 
          className="text-primary font-semibold hover:underline focus:outline-none"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};
