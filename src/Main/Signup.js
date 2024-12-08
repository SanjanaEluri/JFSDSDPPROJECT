import React, { useState } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');
  const [dobError, setDobError] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    dateofbirth: '',
    gender: '',
    location: '',
    email: '',
    bloodgroup: '',
    contact: '',
    password: '',
  });

  // Get today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Email validation
    if (id === 'email') {
      if (!value.endsWith('@gmail.com')) {
        setEmailError('Email must be a Gmail address (gmail.com)');
      } else {
        setEmailError('');
      }
    }

    // Confirm Password validation
    if (id === 'confirmPassword') {
      if (formData.password && formData.password !== value) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }

    // Contact validation
    if (id === 'contact') {
      const contactRegex = /^[6-9]\d{9}$/; // Starts with 6, 7, 8, or 9 and has 10 digits
      if (!contactRegex.test(value)) {
        setContactError('Contact number must start with 6, 7, 8, or 9 and contain 10 digits');
      } else {
        setContactError('');
      }
    }

    // Date of Birth validation
    if (id === 'dateofbirth') {
      const selectedDate = new Date(value);
      if (selectedDate >= new Date()) {
        setDobError('Date of birth must be a past date');
      } else {
        setDobError('');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== document.getElementById("confirmPassword").value) {
      setPasswordError('Passwords do not match');
      setMessage('Please make sure passwords match');
      return;
    }
    if (emailError || contactError || dobError) {
      setMessage('Please fix the errors in the form');
      return;
    }

    try {
      const response = await axios.post('https://jfsdsdpbackend.up.railway.app/patientreg', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      setPasswordError('');
      if (response.status === 200) {
        setMessage('Registration successful!');
        setFormData({
          name: '',
          dateofbirth: '',
          gender: '',
          location: '',
          email: '',
          bloodgroup: '',
          contact: '',
          password: '',
        });
      }
      setMessage(response.data.message || 'Registration successful!');
      setError('');
      document.getElementById("confirmPassword").value = '';
    } catch (error) {
      if (error.status === 500) {
        setError("Account already exists");
      } else {
        setError(error.message);
      }
      setMessage('');
    }
  };

  return (
    <div className="signup-section">
      <div className="signup-wrapper">
        {message && <p className="notification-message">{message}</p>}
        {error && <p className="notification-message">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-field">
            <label>Name</label>
            <input type="text" id="name" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input type="text" id="contact" onChange={handleChange} required />
            {contactError && <p className="notification-message">{contactError}</p>}
          </div>
          <div className="form-field">
            <label>DOB</label>
            <input
              type="date"
              id="dateofbirth"
              max={today} // Disable future dates
              onChange={handleChange}
              required
            />
            {dobError && <p className="notification-message">{dobError}</p>}
          </div>
          <div className="form-field">
            <label>Address</label>
            <input type="text" id="location" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Gender</label>
            <select id="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" id="email" onChange={handleChange} required />
            {emailError && <p className="notification-message">{emailError}</p>}
          </div>
          <div className="form-field">
            <label>BloodGroup</label>
            <input type="text" id="bloodgroup" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input type="password" id="password" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Confirm Password</label>
            <input type="password" id="confirmPassword" onChange={handleChange} required />
            {passwordError && <p className="notification-message">{passwordError}</p>}
          </div>
          <div className="form-actions">
            <button type="submit">Signup</button>
          </div>
          <p className="signup-prompt">Already have an account?</p>
          <Link to="/login" className="signup-button">Login</Link>
        </form>
      </div>
    </div>
  );
}
