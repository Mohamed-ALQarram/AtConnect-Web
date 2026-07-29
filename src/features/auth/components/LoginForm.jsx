import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

// The main login form we show to users
export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Custom hook we built to handle API loading and errors automatically
  const { execute, isLoading, error } = useLogin();
  const navigate = useNavigate();

  // Switch between seeing the text or hiding the text
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Called when the user clicks 'Login'
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing

    // Call the login API
    const result = await execute(username, password);

    if (result.success) {
      // Login worked! Send them to the home page (chat area)
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-md bg-card rounded-24 p-8 shadow-xl border border-dark flex flex-col items-center mx-auto">
      {/* Logo & Brand */}
      <div className="flex items-center gap-1 mb-6">
        <img src="/AtConnect-Logo.png" alt="Logo" className="w-12 rounded-full object-cover" />
        <h1 className="text-xl font-bold text-text-main">Connect</h1>
      </div>

      {/* Welcome Title */}
      <h2 className="text-2xl font-bold text-text-main mb-2">Welcome Back</h2>
      <p className="text-sm text-text-muted mb-8 text-center">
        Enter your credentials to access your account
      </p>

      {/* Show Error Box if login fails */}
      {error && (
        <div className="w-full bg-danger/10 border border-danger/20 text-danger text-sm p-3 rounded-16 mb-4 text-center">
          {error}
        </div>
      )}

      {/* The form box */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          icon={User}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button type="submit" isLoading={isLoading} className="mt-2">
          Login
        </Button>
      </form>

      {/* Extra Links at the bottom */}
      <button className="mt-6 text-sm text-primary hover:underline focus:outline-none">
        Forgot Username or Password?
      </button>

      <div className="mt-8 text-sm text-text-muted flex flex-col items-center gap-3">
        <div>
          Don't have an account?{' '}
          <button
            type="button"
            className="text-primary font-semibold hover:underline focus:outline-none"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        </div>

        <div className="w-full flex items-center gap-3 my-1">
          <div className="flex-1 h-[1px] bg-dark"></div>
          <span className="text-xs text-muted">OR</span>
          <div className="flex-1 h-[1px] bg-dark"></div>
        </div>

        <button
          type="button"
          className="w-full py-2.5 rounded-xl border border-dark hover:border-primary/40 text-main text-sm font-semibold hover:bg-surface transition-all flex items-center justify-center gap-2"
          onClick={() => navigate('/guest')}
        >
          Explore as Guest
        </button>
      </div>
    </div>
  );
};
