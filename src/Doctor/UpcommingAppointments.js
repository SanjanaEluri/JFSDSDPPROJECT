// UpcomingAppointments.js
import React, { useState } from 'react';
import './upcommingappointments.css'

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Doe', date: '2024-11-05', time: '9:00 AM', status: 'Pending' },
    { id: 2, patientName: 'Jane Smith', date: '2024-11-06', time: '11:00 AM', status: 'Pending' },
    // Add more sample appointments as needed
  ]);

  const handleAccept = (id) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: 'Accepted' } : appointment
    ));
  };

  const handleReject = (id) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: 'Rejected' } : appointment
    ));
  };

  return (
    <div className="upcoming-appointments">
      <h1>Upcoming Appointments</h1>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                {appointment.status === 'Pending' ? (
                  <>
                    <button onClick={() => handleAccept(appointment.id)}>Accept</button>
                    <button onClick={() => handleReject(appointment.id)}>Reject</button>
                  </>
                ) : (
                  <span>{appointment.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingAppointments;
