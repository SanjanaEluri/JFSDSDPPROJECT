import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './prescriptionform.css';

const PrescriptionForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prescriptionId = queryParams.get('id');

  const [patientName, setPatientName] = useState('');
  const [prescription, setPrescription] = useState('');

  useEffect(() => {
    if (prescriptionId) {
      // Fetch and populate prescription details based on the ID (if editing an existing prescription)
      // Example: setPatientName('John Doe'); setPrescription('Amoxicillin 500mg, twice daily');
      // You can replace this with actual data fetching logic
    }
  }, [prescriptionId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (prescriptionId) {
      // Update existing prescription logic
      console.log(`Prescription updated for ${patientName}: ${prescription}`);
    } else {
      // Add new prescription logic
      console.log(`Prescription added for ${patientName}: ${prescription}`);
    }
    setPatientName('');
    setPrescription('');
    alert('Prescription submitted successfully');
  };

  return (
    <div className="prescription-form">
      <h1>{prescriptionId ? 'Edit Prescription' : 'Add Prescription'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </label>
        <label>
          Prescription:
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">{prescriptionId ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
