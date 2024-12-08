import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminLogin from './AdminLogin';
import ViewDoctors from './ViewDoctors';
import ViewPatients from './ViewPatients';
import UpdateDoctorStatus from './UpdateDoctorStatus';
import '../style.css'; // Assuming styles are in a shared style file or adjust as per your project structure.

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin'); // Redirect to login after logout
    window.location.reload();
  };

  return (
    <div>
      {/* Header Section */}
      <div className="header-container">
        <header className="app-header">
          <div className="app-logo">
            + SOUL MEDIC
            <p className="tagline">Multi Specialty Hospital</p>
          </div>
          <div className="nav-bar">
            <button className="logoutbutton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
      </div>

      {/* Sidebar Section */}
      <div className="sidebar">
        <Link to="/adminhome">Dashboard</Link>
        <Link to="/viewdoctors">View Doctors</Link>
        <Link to="/viewpatients">View Patients</Link>
        <Link to="/updatedoctorstatus">Update Doctor Status</Link>
      </div>

      {/* Routing Section */}
      <Routes>
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/viewdoctors" element={<ViewDoctors />} />
        <Route path="/viewpatients" element={<ViewPatients />} />
        <Route path="/updatedoctorstatus" element={<UpdateDoctorStatus />} />
        {/* Default redirect to AdminLogin */}
        <Route path="/" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}
