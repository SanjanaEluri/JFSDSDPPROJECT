import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null); // Prescription details

  useEffect(() => {
    const storedPatientData = localStorage.getItem('patient');
    if (storedPatientData) {
      setPatientData(JSON.parse(storedPatientData));
    }
  }, []);

  // Memoize the fetchData function
  const fetchData = useCallback(async () => {
    if (patientData && patientData.id) {
      try {
        const response = await axios.get(`https://jfsdsdpbackend.up.railway.app/viewappointments?pid=${patientData.id}`);
        setAppointments(response.data);
        setError(null); // Clear any previous errors
      } catch (e) {
        setError(e.message); // Set the error message
        console.error(e); // Log the error
      }
    }
  }, [patientData]); // Add patientData as a dependency

  useEffect(() => {
    fetchData(); // Call fetchData when patientData changes
  }, [fetchData]); // Include fetchData in the dependency array

  const handleActionClick = async (appointmentId) => {
    try {
      await axios.post(`https://jfsdsdpbackend.up.railway.app/cancelappointment?aid=${appointmentId}`);
      fetchData(); // Refresh the appointments list after cancellation
    } catch (e) {
      setError(e.message); // Set the error message
      console.error(e); // Log the error
    }
  };

  const handlePrescriptionClick = (prescription) => {
    if (prescription) {
      setSelectedPrescription(prescription); // Show the prescription
    } else {
      alert('No prescription available for this appointment.');
    }
  };

  const handleClosePrescription = () => {
    setSelectedPrescription(null); // Close the prescription card
  };

  return (
    <div className="upcoming-appointments">
      <h1>Upcoming Appointments</h1>

      {/* Display the error message if an error occurs */}
      {error && <div className="error-message">Error: {error}</div>}

      <div className="appointments-header">
        <span>Total Appointments: {appointments.length}</span>
      </div>

      {/* Apply blur when prescription is visible */}
      <div className={`table-container ${selectedPrescription ? 'blur-background' : ''}`}>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Email</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Prescription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.doctorname}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.fees}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.status === 'Cancel' || appointment.status === 'Rejected' ? (
                      <button className="btn-prescription" disabled>
                        No Prescription
                      </button>
                    ) : (
                      <button
                        className="btn-prescription"
                        onClick={() => handlePrescriptionClick(appointment.prescription)}
                      >
                        View Prescription
                      </button>
                    )}
                  </td>
                  <td>
                    {appointment.status === 'Cancel' ||
                    appointment.status === 'Rejected' ||
                    appointment.status === 'Accepted' ? (
                      <button className="btn-cancel" disabled>
                        {appointment.status === 'Approved' ? 'Approved' : 'Cancel'}
                      </button>
                    ) : (
                      <button
                        className="btn-cancel"
                        onClick={() => handleActionClick(appointment.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-appointments">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Prescription Card */}
      {selectedPrescription && (
        <div className="prescription-card">
          <div className="card-content">
            <h3>Prescription Details</h3>
            <p>{selectedPrescription}</p>
            <button className="btn-close" onClick={handleClosePrescription}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
