import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './doctorcss/upcomingappointments.css';
import { useNavigate } from 'react-router-dom';

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [emailStatus, ] = useState({}); // Track email statuses
  const navigate = useNavigate();

  // Get doctor ID from localStorage
  const storedDoctorData = localStorage.getItem('doctor');
  const docid = storedDoctorData ? JSON.parse(storedDoctorData).id : null;

  // Handle navigation to emailform
  const handleLink = (appointment) => {
    navigate('/emailform', { state: { ...appointment } });
  };

  useEffect(() => {
    if (docid) {
      axios
        .get(`https://jfsdsdpbackend.up.railway.app/docappointments?docid=${docid}`)
        .then((response) => {
          const now = new Date();

          // Filter future appointments with "Accepted" status
          const acceptedAppointments = response.data.filter((appointment) => {
            const [year, month, day] = appointment.date.split('-').map(Number); // Split date as YYYY-MM-DD
            const [hour, minute] = appointment.time.split(':').map(Number); // Split time as HH:mm

            const appointmentDateTime = new Date(year, month - 1, day, hour, minute);

            return appointmentDateTime > now && appointment.status === 'Accepted';
          });

          setAppointments(acceptedAppointments);
        })
        .catch((error) => console.error('Error fetching appointments:', error));
    }
  }, [docid]);

  return (
    <div className="upcoming-appointments">
      <h1>Upcoming Accepted Appointments</h1>
      <div className="appointments-header">
        <span>Total Accepted Appointments: {appointments.length}</span>
      </div>
      <div className="table-container">
        {appointments.length > 0 ? (
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Email</th>
                <th>Fee Status</th>
                <th>Send Link</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patientid}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.fees}</td>
                  <td>
                    <button
                      className="btn-prescription"
                      onClick={() => handleLink(appointment)}
                      disabled={emailStatus[appointment.id] === 'sent'} // Disable if already sent
                    >
                      {emailStatus[appointment.id] === 'sent' ? 'Sent' : 'Send Link'}
                    </button>
                  </td>
                  <td>
                    {emailStatus[appointment.id] === 'sent' ? (
                      <span className="status-sent">✅</span>
                    ) : (
                      <span className="status-waiting">Waiting</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-appointments">No accepted appointments found.</div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
