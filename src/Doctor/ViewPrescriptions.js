import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './viewprescriptions.css';

const ViewPrescriptions = () => {
  const navigate = useNavigate();
  const [prescriptions] = useState([
    { id: 1, patientName: 'John Doe', date: '2024-10-30', details: 'Amoxicillin 500mg, twice daily' },
    { id: 2, patientName: 'Jane Smith', date: '2024-10-28', details: 'Ibuprofen 200mg, thrice daily' },
    // Add more sample prescriptions as needed
  ]);

  const handleAddPrescription = () => {
    navigate('/addprescription');
  };

  return (
    <div className="view-prescriptions">
      <h1>Past Prescriptions</h1>
      
      <table className="prescription-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Prescription Details</th>
            <th>Add Prescription</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td>{prescription.patientName}</td>
              <td>{prescription.date}</td>
              <td>{prescription.details}</td>
              <td>
              <button onClick={handleAddPrescription} className="add-button">
        Add Prescription
      </button>
      </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPrescriptions;
