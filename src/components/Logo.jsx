import React from 'react';
import logo from '../assets/logo.png'; // Make sure this path matches your actual logo file

export const Logo = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logo} 
        alt="Fleet Management Logo" 
        className="h-8 w-auto"
      />
      <span className="ml-2 text-xl font-semibold">Fleet</span>
    </div>
  );
};

export default Logo; 