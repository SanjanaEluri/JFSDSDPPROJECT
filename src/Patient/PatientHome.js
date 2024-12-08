import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PatientHome() {
  const [patientData, setPatientData] = useState(""); // State for storing patient data
  const [appointmentsCount, setAppointmentsCount] = useState(0); // State for storing appointment count
  const [error, setError] = useState(""); // State for storing error message

  useEffect(() => {
    // Get patient data from localStorage
    const storedPatientData = localStorage.getItem('patient');
    if (storedPatientData) {
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatientData(parsedPatientData); // Set patient data
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  useEffect(() => {
    // Fetch appointment count when patientData is available
    if (patientData && patientData.patientid) {
      const fetchCounts = async () => {
        try {
          console.log(patientData.patientid);
          const response = await axios.get(`https://jfsdsdpbackend.up.railway.app/totalappointments?pid=${patientData.patientid}`);
          setAppointmentsCount(response.data); // Set the appointment count
        } catch (error) {
          setError('Failed to fetch appointment count');
          console.error(error);
        }
      };

      fetchCounts(); // Fetch the appointment count after patient data is set
    }
    // Adding the correct dependencies, patientData is sufficient
  }, [patientData]); // Dependency array includes only patientData

  return (
    <div>
      {patientData ? (
        <div>
          <h4
            style={{
              color: 'blue',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: 90,
            }}
          >
            Welcome {patientData.name}
          </h4>
          <div
            className="appointments-card"
            style={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '16px' }}>
              Total Appointments: <strong>{appointmentsCount}</strong>
            </p>
          </div>
        </div>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
