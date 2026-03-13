import React, { forwardRef } from 'react';

// A reusable input component that supports left and right icons
export const Input = forwardRef(({ label, icon: Icon, rightIcon, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Input Label */}
      {label && (
        <label className="text-sm font-medium text-text-main">
          {label}
        </label>
      )}

      {/* Input Field Container */}
      <div className="relative flex w-full items-center">
        {Icon && (
          <div className="absolute left-4 text-text-muted">
            <Icon size={20} />
          </div>
        )}

        <input
          ref={ref}
          className={`w-full bg-main border border-dark text-text-main text-sm rounded-24 py-3 placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors 
            ${Icon ? 'pl-11' : 'pl-4'} 
            ${rightIcon ? 'pr-11' : 'pr-4'} 
            ${error ? 'border-danger' : ''} 
            ${className}`}
          {...props}
        />

        {/* Optional Icon button on the right, like a password reveal eye */}
        {rightIcon && (
          <div className="absolute right-4 text-text-muted flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-xs text-danger mt-1">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
