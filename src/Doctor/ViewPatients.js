import React, { useState } from 'react';
import './viewpatients.css'; // Ensure you create a CSS file for styles

// Sample patient data
const patientsData = [
  { id: 1, name: 'Jane Smith', age: 28, condition: 'Follow-up', email: 'jane@example.com' },
  { id: 2, name: 'Bob Johnson', age: 34, condition: 'New Patient', email: 'bob@example.com' },
  { id: 3, name: 'Alice Brown', age: 30, condition: 'Routine Check', email: 'alice@example.com' },
  // Add more patient data as needed
];

export default function ViewPatients() {
  const [patientId, setPatientId] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);

  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patientsData.find((p) => p.id === parseInt(patientId));
    setPatientDetails(patient || null); // Set patient details or null if not found
  };

  return (
    <div className="view-patients">
      <h2>View Patient Details</h2>
      <form onSubmit={handleSubmit} className="patient-id-form">
        <input
          type="number"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={handleInputChange}
          required
        />
        <button type="submit">View</button>
      </form>

      {patientDetails ? (
        <div className="patient-card">
          <h3>{patientDetails.name}</h3>
          <p>Age: {patientDetails.age}</p>
          <p>Condition: {patientDetails.condition}</p>
          <p>Email: {patientDetails.email}</p>
        </div>
      ) : (
        patientId && <p>No patient found with ID: {patientId}</p>
      )}
    </div>
  );
}
