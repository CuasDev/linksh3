import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
    </div>
  );
};

export default ErrorMessage;