import React, { useState } from 'react';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    dd: '',
    mm: '',
    yyyy: '',
    uname: '',
    pword: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    {
      title: "Personal Information",
      icon: "👤",
      fields: [
        { placeholder: "First name...", name: "fname", type: "text", required: true },
        { placeholder: "Last name...", name: "lname", type: "text", required: true }
      ]
    },
    {
      title: "Contact Details",
      icon: "📞",
      fields: [
        { placeholder: "E-mail...", name: "email", type: "email", required: true },
        { placeholder: "Phone...", name: "phone", type: "tel", required: true }
      ]
    },
    {
      title: "Birthday",
      icon: "🎂",
      fields: [
        { placeholder: "DD", name: "dd", type: "text", pattern: "[0-9]*", maxLength: 2, required: true },
        { placeholder: "MM", name: "mm", type: "text", pattern: "[0-9]*", maxLength: 2, required: true },
        { placeholder: "YYYY", name: "yyyy", type: "text", pattern: "[0-9]*", maxLength: 4, required: true }
      ]
    },
    {
      title: "Account Setup",
      icon: "🔒",
      fields: [
        { placeholder: "Username...", name: "uname", type: "text", required: true },
        { placeholder: "Password...", name: "pword", type: "password", required: true }
      ]
    },
    {
      title: "Preview & Submit",
      icon: "✅",
      fields: [] // No input fields for this step
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = () => {
    const currentFields = steps[currentStep].fields;
    const newErrors = {};
    
    currentFields.forEach(field => {
      if (field.required && !formData[field.name].trim()) {
        newErrors[field.name] = `${field.placeholder.replace('...', '')} is required`;
      } else if (field.pattern && formData[field.name]) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(formData[field.name])) {
          newErrors[field.name] = `Invalid format for ${field.placeholder.replace('...', '')}`;
        }
      } else if (field.name === 'email' && formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      // Submit form data
      console.log('Form submitted:', formData);
      alert('Registration Successful!');
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h1>Create Your Account</h1>
          <p>Complete all {steps.length} steps to finish registration</p>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">{Math.round(progress)}% Complete</div>
        </div>
        
        <div className="step-indicator">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`step-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`step-content ${index === currentStep ? 'active' : ''}`}
            >
              {index === steps.length - 1 ? (
                // Preview Step
                <div>
                  <h2 className="step-heading">Review Your Information</h2>
                  <ul className="preview-list">
                    {Object.entries(formData).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key.replace(/^\w/, c => c.toUpperCase())}:</strong> {value || "Not provided"}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                // Regular Step
                <div>
                  <h2 className="step-heading">
                    <span className="step-number">Step {index + 1}</span>
                    {step.title}
                  </h2>
                  <div className="form-grid">
                    {step.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="input-group">
                        <input
                          className={`form-input ${errors[field.name] ? 'invalid' : ''}`}
                          placeholder={field.placeholder}
                          name={field.name}
                          type={field.type}
                          value={formData[field.name]}
                          onChange={handleChange}
                          pattern={field.pattern}
                          maxLength={field.maxLength}
                        />
                        {errors[field.name] && (
                          <div className="error-message">{errors[field.name]}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="form-actions">
            {currentStep > 0 && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={prevStep}
              >
                <span className="icon">←</span> Previous
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={nextStep}
              >
                Next <span className="icon">→</span>
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-submit"
              >
                Confirm & Submit
              </button>
            )}
          </div>
        </form>
        
        <div className="form-footer">
          <p>Already have an account? <a href="#login">Sign in</a></p>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;