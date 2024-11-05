import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import '../style.css'
import PatientHome from './PatientHome'
import PatientProfile from './PatientProfile'
import BookAppointment from './BookAppointment'
import MyAppointments from './MyAppointments'
import Home from '../Main/Home'
import { useNavigate } from 'react-router-dom'

export default function PatientNavBar() {
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('isPatientLoggedIn');
    localStorage.removeItem('Patient');

    navigate('/home');
    window.location.reload()
  };
  return (

    <div>
      <div className='header-container'>
        <header className='app-header'>
        <div className="app-logo">
      + SOUL MEDIC
      <p className="tagline">Multi Specialty Hospital</p>
    </div>
      <div className='nav-bar'>

        {/* <Link to="patienthome">Home</Link> */}
        <Link to='profile'>Profile</Link>
       
      </div>
      </header>
      </div>
      <div className='sidebar'>
      <Link to='/patienthome'>Home</Link>
      <Link to='/BookAppointment'>Book Appointment</Link>
      <Link to='/MyAppointments'>My Appointments</Link>
       <Link><button className='logoutbutton' onClick={handleLogout}>Logout</button></Link>
      </div>
      <Routes>
        <Route path='/'Component={PatientHome}/>
        <Route path='/patienthome' Component={PatientHome}/>
        <Route path='/profile' Component={PatientProfile}/>
        <Route path='/BookAppointment' Component={BookAppointment}/>
        <Route path='/MyAppointments' Component={MyAppointments}/>
        <Route path='/home' Component={Home}/>
        
      </Routes>
    </div>
  )
}