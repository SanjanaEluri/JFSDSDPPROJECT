import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './updatestatus.css'; // Add necessary styling

export default function UpdateDoctorStatus() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://jfsdsdpbackend.up.railway.app/viewdoctors');
        // Filter doctors to get only those with "Registered" status
       
        setDoctors(response.data);
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        console.error(err);
        setError('Failed to fetch doctors. Please try again later.');
        setLoading(false); // Set loading to false even if there is an error
      }
    };
    fetchDoctors();
  }, []);

  const updateStatus = async (email, status) => {
    try {
      const response = await axios.get('https://jfsdsdpbackend.up.railway.app/updatedoctorstatus', {
        params: {
          email: email,
          status: status,
        },
      });
      setMessage(response.data.message || 'Status updated successfully!');

      // Update the doctor's status in the state to reflect the change
      setDoctors((prevDoctors) =>
        prevDoctors.map((doc) =>
          doc.email === email ? { ...doc, status: status } : doc
        )
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update status. Please try again later.');
    }
  };

  return (
    <div className="view-doctors-container">
      {loading && <p className="loading-message">Loading doctors...</p>}
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      {!loading && doctors.length > 0 ? (
        <table className="doctors-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.status}</td>
                <td>
                  <button
                    className="accept-button"
                    onClick={() => updateStatus(doctor.email, 'accepted')}
                    disabled={doctor.status === 'accepted'}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => updateStatus(doctor.email, 'rejected')}
                    disabled={doctor.status === 'rejected'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No doctors found.</p>
      )}
    </div>
  );
}
