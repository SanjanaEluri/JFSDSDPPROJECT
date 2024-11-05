import React, { useState } from 'react'; 
import '../style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DoctorSignUp() {
  const [passwordError, setPasswordError] = useState('');
  const [doctor, setDoctor] = useState({
    name: '',
    dateofbirth: '',
    gender: '',
    specialization:'',
    location: '',
    email: '',
    contact: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post('http://localhost:2220/docreg', doctor);
      if (response.status === 200) {
        setMessage(response.data);
        handleReset();
      }
    } catch (error) {
      console.log(error.message); // Log error for debugging
      setMessage(error.message);
    }
  };
  

  const handleReset = () => {
    setDoctor({
      name: '',
      dateofbirth: '',
      gender: '',
      specialization: '',
      location: '',
      email: '',
      contact: '',
      password: '',
    });
    setMessage('');
  };

  return (
    <div className="signup-section">
      <div className="signup-wrapper">
      {
            message?
            <p style={{color:"red",fontWeight:"bolder"}}>{message}</p>:
            <p></p>
            }
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-field">
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>DOB</label>
            <input type="date" name="dateofbirth" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Gender</label>
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-field">
            <label>Specialization</label>
            <input type="text" name="specialization" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Location</label>
            <input type="text" name="location" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input type="text" name="contact" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>
          <div className="form-actions">
            <button type="submit">Signup</button>
            <button type="button" onClick={handleReset}>Clear</button>
          </div>
          <p className="signup-prompt">Already have an account?</p>
          <Link to="/doctorlogin" className="signup-button">Login</Link>
        </form>
      </div>
    </div>
  );
}
