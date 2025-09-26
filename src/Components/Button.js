import React from 'react';

const Button = ({ children, className = '', onClick, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
