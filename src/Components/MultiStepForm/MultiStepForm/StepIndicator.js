import React from 'react';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="step-indicator">
      {steps.map((_, index) => (
        <span
          key={index}
          className={`step ${index === currentStep ? 'active' : ''} ${
            index < currentStep ? 'finish' : ''
          }`}
        ></span>
      ))}
    </div>
  );
};

export default StepIndicator;