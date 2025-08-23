import React from 'react';

const Step = ({ step, isActive, formData, handleChange }) => {
  return (
    <div className={`step-content ${isActive ? 'active' : ''}`}>
      <h3 className="step-title">{step.title}:</h3>
      {step.fields.map((field, index) => (
        <div key={index}>
          <input
            className={`input-field ${!formData[field.name] && isActive ? 'invalid' : ''}`}
            placeholder={field.placeholder}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
            pattern={field.pattern}
            maxLength={field.maxLength}
          />
        </div>
      ))}
    </div>
  );
};

export default Step;