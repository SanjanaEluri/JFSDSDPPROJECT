import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style.css';

export default function Adminlogin() {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const location = useLocation();
  const activeLogin = location.pathname;

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="login-page">
      <section className="login-section">
        <div className="login-content">
        
          <div className="toggle-buttons">
            <Link to="/login" className={`toggle-button patient-login ${activeLogin === '/login' ? 'active' : ''}`}>Patient</Link>
              
            <Link to="/doctorlogin" className={`toggle-button doctor-login ${activeLogin === '/doctorlogin' ? 'active' : ''}`}>Doctor</Link>
            
            <Link to="/adminlogin" className={`toggle-button admin-login ${activeLogin === '/adminlogin' ? 'active' : ''}`}>Admin</Link>
             
              
            
            
          
            <div className="toggle-selector"></div>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Username:</label>
              <input type="username" id='email' onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" id='password' onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
            
          </form>
        </div>
      </section>
    </div>
  );
}
