import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClass = `spinner-${size}`;
  const colorClass = `spinner-${color}`;
  
  return (
    <div className={`loading-spinner ${sizeClass} ${colorClass}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  );
};

export default LoadingSpinner;