import React, { useState } from 'react';
import './RegistrationForm.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../components/URL';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [currentField, setCurrentField] = useState('name');
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFieldChange = (fieldName) => {
    setCurrentField(fieldName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phoneNumber, password } = formData;
    let validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!validatePhoneNumber(phoneNumber)) {
      validationErrors.phoneNumber = 'Invalid phone number';
    }

    if (Object.keys(validationErrors).length === 0) {
      // console.log(formData);
      // setFormData({
      //   ...formData,
      //   [currentField]: '',
      // });
      // setErrors({
      //   email: '',
      //   phoneNumber: '',
      // });
      // setCurrentField('name');
      // setIsRegistered(true);


      let response = await fetch(`${BASE_URL}/register`, {
      method: 'post',
      body: JSON.stringify({ name, email, phoneNumber, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const result = await response.json();
    console.log(response);
    if(response.ok){
      setFormData({
          ...formData,
          [currentField]: '',
        });

         setErrors({
        email: '',
        phoneNumber: '',
      });
      setCurrentField('name');
      setIsRegistered(true);
    }
    else{
      window.alert(result.error);
    }
    } else {
      setErrors(validationErrors);
     
    }

   
   
  };

  const isFieldValid = (fieldName) => {
    switch (fieldName) {
      case 'name':
        return formData.name.trim() !== '';
      case 'email':
        return validateEmail(formData.email);
      case 'phoneNumber':
        return validatePhoneNumber(formData.phoneNumber);
      case 'password':
        return formData.password.trim() !== '';
      case 'confirmPassword':
        return formData.confirmPassword === formData.password;
      default:
        return false;
    }
  };

  const renderTickIcon = (fieldName) => {
    if (isFieldValid(fieldName)) {
      return <span className="tick">&#10003;</span>;
    }
    return null;
  };

  return (
    <div>
      <div>
        <h1 className="registration-form-heading">Registration Form</h1>
        {!isRegistered && (
          <div className="registration-form-container">
            <span className="registration-form-text">
              Already have an account?{' '}
              <Link className="go-to-login-button" to="/user/login">
                Sign In
              </Link>
            </span>
          </div>
        )}
      </div>

      {!isRegistered ? (
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {renderTickIcon('name')}
          </div>
          {currentField !== 'name' && (
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {renderTickIcon('email')}
              {errors.email && <p className="warning">{errors.email}</p>}
            </div>
          )}
          {currentField !== 'name' && currentField !== 'email' && (
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {renderTickIcon('phoneNumber')}
              {errors.phoneNumber && (
                <p className="warning">{errors.phoneNumber}</p>
              )}
            </div>
          )}
          {currentField !== 'name' &&
            currentField !== 'email' &&
            currentField !== 'phoneNumber' && (
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {renderTickIcon('password')}
              </div>
            )}
          {currentField !== 'name' &&
            currentField !== 'email' &&
            currentField !== 'phoneNumber' &&
            currentField !== 'password' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {renderTickIcon('confirmPassword')}
                {formData.confirmPassword !== formData.password && (
                  <p className="warning">Passwords do not match</p>
                )}
              </div>
            )}
          {currentField !== 'confirmPassword' && (
            <button
              type="button"
              className={`btn-next ${isFieldValid(currentField) ? 'btn-active' : ''
                }`}
              disabled={!isFieldValid(currentField)}
              onClick={() =>
                handleFieldChange(
                  currentField === 'name'
                    ? 'email'
                    : currentField === 'email'
                      ? 'phoneNumber'
                      : currentField === 'phoneNumber'
                        ? 'password'
                        : 'confirmPassword'
                )
              }
            >
              Next
            </button>
          )}
          {currentField === 'confirmPassword' && (
            <button
              type="submit"
              className={`btn-register ${isFieldValid('confirmPassword') ? 'btn-active' : ''
                }`}
              disabled={!isFieldValid('confirmPassword')}
            >
              Register
            </button>
          )}
        </form>
      ) : (
        <div className="success-message">
          <span className="success-icon">&#10003;</span>
          <p>Registered successfully!</p>
          {/* <button
            className="go-to-login-button"
            onClick={() => setIsRegistered(false)}
          >
            Go to Login
          </button> */}
          <Link className="go-to-login-button" onClick={() => setIsRegistered(false)} to='/user/login'>Log In</Link>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
