import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-text_secondary mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full py-3 px-4 text-text_primary bg-card_bg border ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-border_custom focus:ring-accent/20 focus:border-accent'
          } rounded-md text-sm md:text-base outline-none transition-all focus:ring-4 ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-text_secondary mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full py-3 px-4 text-text_primary bg-card_bg border ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-border_custom focus:ring-accent/20 focus:border-accent'
          } rounded-md text-sm md:text-base outline-none transition-all focus:ring-4 resize-none h-32 ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
