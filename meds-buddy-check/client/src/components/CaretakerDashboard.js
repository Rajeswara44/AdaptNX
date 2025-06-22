import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CaretakerDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPatients = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/caretaker/patients', {
        headers: { Authorization: 'Bearer ' + token },
      });
      setPatients(response.data);
    } catch (err) {
      setError('Failed to fetch patients.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="caretaker-dashboard-container">
      <h2>Caretaker Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <strong>{patient.username}</strong> - Medications: {patient.medicationsCount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaretakerDashboard;
