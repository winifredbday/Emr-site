import React from 'react';
import './LoadingSpinner.css'; // Create a CSS file for styles

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
