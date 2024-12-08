import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);

  // Fetch doctor data from localStorage
  useEffect(() => {
    const storedPatientData = localStorage.getItem('doctor');
    if (storedPatientData) {
      setPatientData(JSON.parse(storedPatientData));
    }
  }, []);

  // Fetch patients only when patientData is available
  useEffect(() => {
    if (!patientData || !patientData.id) return; // Wait for patientData to be set

    const fetchAppointmentsAndPatients = async () => {
      try {
        // Step 1: Fetch all appointments
        const appointmentsResponse = await axios.get(
          `https://jfsdsdpbackend.up.railway.app/docappointments?docid=${patientData.id}`
        );
        const appointments = appointmentsResponse.data;

        // Extract unique patient IDs from the appointments
        const uniquePatientIds = [...new Set(appointments.map((appointment) => appointment.patientid))];

        // Step 2: Fetch details for each patient ID
        const patientDetailsPromises = uniquePatientIds.map((id) =>
          axios.get(`https://jfsdsdpbackend.up.railway.app/viewdocpatients?id=${id}`)
        );
        const patientDetailsResponses = await Promise.all(patientDetailsPromises);

        // Step 3: Combine all patient details
        const patientsData = patientDetailsResponses.map((response) => response.data);

        setPatients(patientsData.flat()); // Flatten the array if needed
      } catch (error) {
        console.error('Error fetching patients:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsAndPatients();
  }, [patientData]); // Depend on patientData to ensure it's set

  return (
    <div className="upcoming-appointments">
      <div className="view-appointments">
        <h1>Patients List</h1>
        <div className="appointments-header">
          <span>Total Patients: {patients.length}</span>
        </div>
        {loading ? (
          <p>Loading patients...</p>
        ) : (
          <div className="table-container">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Date Of Birth</th>
                  <th>Gender</th>
                  <th>Location</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Blood Group</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.dateofbirth}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.location}</td>
                      <td>{patient.email}</td>
                      <td>{patient.contact}</td>
                      <td>{patient.bloodgroup}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" align="center">
                      No patients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
