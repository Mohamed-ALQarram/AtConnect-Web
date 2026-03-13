import React from 'react';

// A simple reusable button component
export const Button = ({ children, className = '', isLoading, ...props }) => {
  return (
    <button
      className={`w-full bg-primary text-text-main font-semibold py-3 px-6 rounded-24 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
