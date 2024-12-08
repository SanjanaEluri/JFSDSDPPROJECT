import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminHome() {
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  // Fetch doctors and calculate counts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://jfsdsdpbackend.up.railway.app/viewdoctors');
        const doctors = response.data;

        // Filter doctors by status
        const acceptedDoctors = doctors.filter((doctor) => doctor.status === 'accepted');
        const rejectedDoctors = doctors.filter((doctor) => doctor.status === 'rejected');
        const registeredDoctors = doctors.filter((doctor) => doctor.status === 'Registered');

        setAcceptedCount(acceptedDoctors.length);
        setRejectedCount(rejectedDoctors.length);
        setRegisteredCount(registeredDoctors.length);

        // Total doctors is the length of the response array
        setTotalDoctors(doctors.length);

        // Set notification if there are pending registrations
        if (registeredDoctors.length > 0) {
          setNotification(`You have ${registeredDoctors.length} doctor(s) waiting for acceptance or rejection.`);
        } else {
          setNotification('');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch total patients and appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total appointments
        const appointmentsResponse = await axios.get('https://jfsdsdpbackend.up.railway.app/totalapp');
        setTotalAppointments(appointmentsResponse.data);

        // Fetch total patients
        const patientsResponse = await axios.get('https://jfsdsdpbackend.up.railway.app/viewpatients');
        setTotalPatients(patientsResponse.data.length); // Total patients is the length of the response array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Accepted', 'Rejected', 'Registered'],
    datasets: [
      {
        data: [acceptedCount, rejectedCount, registeredCount],
        backgroundColor: ['green', 'red', 'yellow'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="admin-home-container">
      <h1>Admin Home</h1>
      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <>
          {notification && (
            <div className="notification">
              <p>{notification}</p>
            </div>
          )}

          {/* Pie chart */}
          <div className="pie-chart-container">
            <Pie data={data} />
          </div>

          {/* Dashboard summary */}
          <div className="dashboard">
            <div className="admin-appointments-list3">
              <h3>Total Appointments</h3>
              <p>{totalAppointments}</p>
            </div>

            <div className="admin-appointments-list">
              <h3>Total Doctors</h3>
              <p>{totalDoctors}</p>
            </div>

            <div className="admin-appointments-list2">
              <h3>Total Patients</h3>
              <p>{totalPatients}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
