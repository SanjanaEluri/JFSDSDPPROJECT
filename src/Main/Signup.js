import React, { useState } from 'react'; 
import '../style.css'
import { Link } from 'react-router-dom';
export default function SignUp() {
  
  const [users, setUsers] = useState([]);
  const [passwordError, setPasswordError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    dateofbirth: '',
    gender: '',
    location: '',
    email: '',
    contact: '',
    password: '',
    
  });

  
  const [message, setMessage] = useState('');

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (e.target.id === 'confirmPassword') {
      if (formData.password && formData.password !== e.target.value) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
console.log(formData)
    
   
if (formData.password !== document.getElementById("confirmPassword").value) {
  setPasswordError('Passwords do not match');
  setMessage('Please make sure passwords match');
  return;
}

setPasswordError('');
setMessage('Registration successful!');

      
     
    

    
   /* const existingUser = users.find(user => user.email === formData.email);
    if (existingUser) {
      setMessage('Account with this email already exists');
      return;
    }

    
    const newUser = { ...formData };
    setUsers([...users, newUser]); 

    
    setMessage('Registration successful!');
    setFormData({
      name: '',
      phone: '',
      dob: '',
      address: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
    });*/
  };

  return (
   
      <div className="signup-section">
        <div className="signup-wrapper">
          {message && <p className="notification-message">{message}</p>} {/* Display message */}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-field">
              <label>Name</label>
              <input type="text" id="name"  onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input type="text" id="contact"  onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>DOB</label>
              <input type="date"id='dateofbirth'  onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Address</label>
              <input type="text" id="location"  onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Gender</label>
              <select id="gender"  onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" id="email"  onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input type="password" id="password"  onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Confirm Password</label>
              <input type="password" id="confirmPassword"  onChange={handleChange} required />
              {passwordError && <p  className="notification-message">{passwordError}</p>} {/* Error message shown here */}
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
