import React, { useState } from 'react';
import './viewappointments.css'; // Ensure you create a CSS file for styles

export default function ViewAppointments() {
  // Sample appointments data
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', date: '2024-11-01', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, patient: 'Jane Smith', date: '2024-11-02', time: '2:00 PM', status: 'Completed' },
    { id: 3, patient: 'Alice Johnson', date: '2024-11-03', time: '1:00 PM', status: 'Cancelled' },
  ]);

  // Function to handle adding a new appointment (you can customize this)
  const addAppointment = () => {
    const newAppointment = {
      id: appointments.length + 1,
      patient: `Patient ${appointments.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      time: '3:00 PM',
      status: 'Scheduled',
    };
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div className="view-appointments">
      <h1>View Appointments</h1>
      <button className="add-button" onClick={addAppointment}>Add Appointment</button>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patient}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
