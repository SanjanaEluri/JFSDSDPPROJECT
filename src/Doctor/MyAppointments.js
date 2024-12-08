import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctorcss/upcomingappointments.css';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptionText, setPrescriptionText] = useState("");
  
  const [statusFilter, setStatusFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');

  useEffect(() => {
    const storedPatientData = localStorage.getItem('doctor');
    if (storedPatientData) {
      setPatientData(JSON.parse(storedPatientData));
    }
  }, []);

  const fetchData = async () => {
    if (patientData && patientData.id) {
      try {
        const response = await axios.get(`https://jfsdsdpbackend.up.railway.app/docappointments?docid=${patientData.id}`);
        console.log(response.data);
        setAppointments(response.data);
        setFilteredAppointments(response.data); // Set both initial data and filtered data
      } catch (e) {
        setError(e.message);
      }
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, [patientData]);

  const handlePrescriptionClick = (appointment) => {
    setSelectedAppointment(appointment);
    setPrescriptionText(appointment.prescription || ""); // Set existing prescription if available
  };

  const handleAddPrescription = async () => {
    if (selectedAppointment) {
      try {
        await axios.post(`https://jfsdsdpbackend.up.railway.app/addprescription?id=${selectedAppointment.id}&prescription=${prescriptionText}`);
        fetchData(); // Refresh appointments after adding prescription
        alert("Prescription added successfully!");
        setSelectedAppointment(null); // Close the prescription card
        setPrescriptionText("");
      } catch (error) {
        alert("Error adding prescription: " + error.message);
      }
    }
  };

  const handleClosePrescription = () => {
    setSelectedAppointment(null); // Close the prescription card
    setPrescriptionText("");
  };

  // Filter appointments based on status and month
  const filterAppointments = () => {
    let filtered = [...appointments];

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    // Filter by month
    if (monthFilter !== 'All') {
      const selectedMonth = new Date(monthFilter).getMonth(); // Get month number (0 - 11)
      filtered = filtered.filter(appointment => {
        const appointmentMonth = new Date(appointment.date).getMonth();
        return appointmentMonth === selectedMonth;
      });
    }

    // Set filtered appointments
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    filterAppointments(); // Apply filter whenever the filter values change
  }, [statusFilter, monthFilter, appointments]);

  // Sort appointments by date (most recent first)
  const sortedAppointments = filteredAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="upcoming-appointments">
      <h1>Upcoming Appointments</h1>

      {/* Filter Box */}
      <div className="filter-box">
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="All">All Statuses</option>
          <option value="Accepted">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancel">Cancelled</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select onChange={(e) => setMonthFilter(e.target.value)} value={monthFilter}>
          <option value="All">All Months</option>
          <option value="2024-01-01">January</option>
          <option value="2024-02-01">February</option>
          <option value="2024-03-01">March</option>
          <option value="2024-04-01">April</option>
          <option value="2024-05-01">May</option>
          <option value="2024-06-01">June</option>
          <option value="2024-07-01">July</option>
          <option value="2024-08-01">August</option>
          <option value="2024-09-01">September</option>
          <option value="2024-10-01">October</option>
          <option value="2024-11-01">November</option>
          <option value="2024-12-01">December</option>
        </select>
      </div>

      <div className="appointments-header">
        <span>Total Appointments: {filteredAppointments.length}</span>
      </div>
      
      <div className="table-container">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient ID</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.length > 0 ? (
              sortedAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patientid}</td>
                  <td>{appointment.email}</td>
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
                        onClick={() => handlePrescriptionClick(appointment)}
                      >
                        Add/ViewPrescription
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-appointments">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedAppointment && (
        <div className="prescription-card">
          <div className="card-content">
            <h3>Prescription Details</h3>
            <textarea
              className="prescription-textarea"
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              placeholder="Enter prescription details here..."
            ></textarea>
            <div className="button-group">
              <button className="btn-close" onClick={handleAddPrescription}>
                Add
              </button>
              <button className="btn-close" onClick={handleClosePrescription}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}