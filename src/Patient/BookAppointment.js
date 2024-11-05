import React, { useState } from 'react'; 
import '../style.css'
import { Link } from 'react-router-dom';
export default function SignUp() {
  
  const [users, setUsers] = useState([]);
  const [passwordError, setPasswordError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    specalist: '',
    doctorname: '',
    date: '',
    time: '',
    
    
  });

  
  const [message, setMessage] = useState('');

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
console.log(formData)
    
   


      
     
    

    
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
              <label>Email</label>
              <input type="email" id="email"  onChange={handleChange} required />
            </div>
           
            <div className="form-field">
              <label>Specialist</label>
              <select id="specalist"  onChange={handleChange} required>
                <option value="">Select </option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="general">General</option>
              </select>
            </div>
            <div className="form-field">
              <label>Doctor</label>
              <select id="doctorname"  onChange={handleChange} required>
                <option value="">Select </option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="general">General</option>
              </select>
            </div>
            <div className="form-field">
              <label>Date</label>
              <input type="date" id="date"  onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Time</label>
              <input type="time" id="time"  onChange={handleChange} required />
            </div>
          
            <div className="form-actions">
              <button type="submit">Book</button>
            </div>
            
          </form>
        </div>
      </div>
    
  );
}
