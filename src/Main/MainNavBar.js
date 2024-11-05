import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Services from './Services'
import Login from './Login'
import Signup from './Signup'
import '../style.css'
import Doctorlogin from '../Doctor/Doctorlogin'
import Adminlogin from '../Admin/Adminlogin'
import DoctorSignUp from '../Doctor/DoctorSignup'

export default function MainNavBar({onAdminLogin,onPatientLogin,onDoctorLogin}) {
  return (
    <div>
      <div className='header-container'>
        <header className='app-header'>
        <div className="app-logo">
      + SOUL MEDIC
      <p className="tagline">Multi Specialty Hospital</p>
    </div>
      <div className='nav-bar'>
        <Link to="/home">Home</Link>
        <Link to='/services'>Services</Link>
        <Link to="/login">Login</Link>
      </div>
      </header>
      </div>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/home' Component={Home}/>
        <Route path='/services' Component={Services}/>
        <Route path='/login' element={<Login onPatientLogin={onPatientLogin} />}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/doctorlogin' element={<Doctorlogin onDoctorLogin={onDoctorLogin}/>}/>
        <Route path='/adminlogin' element={<Adminlogin onAdminLogin={onAdminLogin}/>}/>
        <Route path='/doctorsignup' Component={DoctorSignUp}/>
        
      </Routes>
    </div>
  )
}