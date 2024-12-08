import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctorcss/doctorhome.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const generateBarChartData = (appointments) => {
  const dateCounts = {};
  appointments.forEach((appointment) => {
    const date = new Date(appointment.date).toLocaleDateString();
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  return {
    labels: Object.keys(dateCounts),
    datasets: [
      {
        label: 'Number of Appointments',
        data: Object.values(dateCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
};

export default function DoctorHome() {
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [pendingNotifications, setPendingNotifications] = useState(false);

  useEffect(() => {
    const storedDoctorData = localStorage.getItem('doctor');
    if (storedDoctorData) {
      setDoctorData(JSON.parse(storedDoctorData));
    } else {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (doctorData) {
          const response = await axios.get(
            `https://jfsdsdpbackend.up.railway.app/docappointments?docid=${doctorData.id}`
          );
          setAppointments(response.data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorData]);

  useEffect(() => {
    if (appointments.length > 0) {
      const now = new Date();
      const today = now.toLocaleDateString();

      const filteredAppointments = appointments.filter(
        (appointment) => new Date(appointment.date).toLocaleDateString() === today
      );
      setTodaysAppointments(filteredAppointments);
      setChartData(generateBarChartData(appointments));

      // Check for pending meeting links
      const pendingAppointments = appointments.some((appointment) => {
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
        const timeDiff = (appointmentDateTime - now) / (1000 * 60 * 60); // Difference in hours
        return timeDiff < 10 && appointment.status === 'Accepted' && !appointment.linkSent; // linkSent indicates email sent
      });

      setPendingNotifications(pendingAppointments);
    }
  }, [appointments]);

  return (
    <div className="doctor-home">
      {doctorData && (
        <div className="welcome-container">
          <p className="welcome-message">Welcome {doctorData.name}</p>
        </div>
      )}

      {/* Notification for pending links */}
      {pendingNotifications && (
        <div className="notification">
          <p>You have pending meeting links to send for upcoming appointments.</p>
        </div>
      )}

      <div className="dashboard">
        <div className="bar-graph">
          <h3>Patient Bookings by Date</h3>
          {chartData ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                  title: {
                    display: true,
                    text: 'Number of Appointments per Date',
                  },
                },
              }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
        <div className="appointments-list">
          <h3>Today's Scheduled Appointments</h3>
          {todaysAppointments.length > 0 ? (
            <ul>
              {todaysAppointments.map((appointment) => (
                <li key={appointment.id}>
                  <p>
                    <strong>Patient:</strong> {appointment.email}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p>
                    <strong>Status:</strong> {appointment.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments scheduled for today.</p>
          )}
        </div>
      </div>
    </div>
  );
}
