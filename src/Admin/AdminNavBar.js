import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminHome from './AdminHome'; // Admin-specific home component

import ViewDoctors from './ViewDoctors'; // Component to view doctors
import Home from '../Main/Home'; // Main Home component, likely for logout redirect
import '../style.css'; // Import styles

export default function AdminNavBar() {
  return (
    <div>
      <div className='header-container'>
        <header className='app-header'>
          <div className="app-logo">
            + SOUL MEDIC
            <p className="tagline">Multi Specialty Hospital</p>
          </div>
          <div className='nav-bar'>
            <Link to='/profile'>Profile</Link>
          </div>
        </header>
      </div>
      <div className='sidebar'>
        <Link to='/adminhome'>Home</Link>
        <Link to='/viewdoctors'>View Doctors</Link>
        <Link to='/home'>Logout</Link>
      </div>
      <Routes>
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/viewdoctors' element={<ViewDoctors />} />
       
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}
