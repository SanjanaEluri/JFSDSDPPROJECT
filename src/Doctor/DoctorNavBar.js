import React from 'react';
import { Routes, Route, Link,useNavigate } from 'react-router-dom';
import DoctorHome from './DoctorHome';
import DoctorProfile from './DoctorProfile';
import ViewAppointments from './ViewAppointments';

import Home from '../Main/Home';

import '../style.css';
import UpcomingAppointments from './UpcommingAppointments';
import PrescriptionForm from './PrescriptionForm';
import ViewPrescriptions from './ViewPrescriptions';
import ViewPatients from './ViewPatients';

export default function DoctorNavBar() {
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('isDoctorLoggedIn');
    localStorage.removeItem('Doctor');

    navigate('/home');
    window.location.reload()
  };
  return (
    <div>
      {/* Header Section */}
      <div className='header-container'>
        <header className='app-header'>
          <div className="app-logo">
            + SOUL MEDIC
            <p className="tagline">Multi Specialty Hospital</p>
          </div>
          <div className='nav-bar'>
            <Link to='/profile'>Profile</Link>
            <Link to='/home'>Logout</Link>
          </div>
        </header>
      </div>

      {/* Sidebar Section */}
      <div className='sidebar'>
        <Link to='/doctorhome'>Home</Link>
        <Link to='/viewappointment'>View Appointments</Link>
        
        
        <Link to='/upcomingappointments'>Upcoming Appointments</Link>
        <Link to='/addprescription'>Add Prescription</Link>
        <Link to='/viewprescriptions'>View Prescriptions</Link>
        <Link to='/viewpatients'>View Patients</Link>
        <Link><button className='logoutbutton' onClick={handleLogout}>Logout</button></Link>
      </div>

      {/* Routing Section */}
      <Routes>
        <Route path='/' element={<DoctorHome />} />
        <Route path='/doctorhome' element={<DoctorHome />} />
        <Route path='/profile' element={<DoctorProfile />} />
        <Route path='/viewappointment' element={<ViewAppointments />} />
       
       
        <Route path='/upcomingappointments' element={<UpcomingAppointments/>} />
        <Route path='/addprescription' element={<PrescriptionForm/>} />
        <Route path='/viewprescriptions' element={<ViewPrescriptions/>} />
        <Route path='/viewpatients' element={<ViewPatients/>} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}
