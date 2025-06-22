import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '' });
  const [adding, setAdding] = useState(false);

  const fetchMedications = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      // Decode token to get userId or store userId in localStorage after login
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User ID not found. Please login again.');
        setLoading(false);
        return;
      }
      const response = await axios.get('http://localhost:5000/api/medications/' + userId, {
        headers: { Authorization: 'Bearer ' + token },
      });
      setMedications(response.data);
    } catch (err) {
      setError('Failed to fetch medications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleInputChange = (e) => {
    setNewMed({ ...newMed, [e.target.name]: e.target.value });
  };

  const handleAddMedication = async (e) => {
    e.preventDefault();
    if (!newMed.name || !newMed.dosage || !newMed.frequency) {
      setError('Please fill all medication fields.');
      return;
    }
    setAdding(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User ID not found. Please login again.');
        setAdding(false);
        return;
      }
      await axios.post('http://localhost:5000/api/medications/add', { ...newMed, userId }, {
        headers: { Authorization: 'Bearer ' + token },
      });
      setNewMed({ name: '', dosage: '', frequency: '' });
      fetchMedications();
    } catch (err) {
      setError('Failed to add medication.');
    } finally {
      setAdding(false);
    }
  };

  const handleMarkTaken = async (id) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/medications/' + id + '/taken', {}, {
        headers: { Authorization: 'Bearer ' + token },
      });
      fetchMedications();
    } catch (err) {
      setError('Failed to mark medication as taken.');
    }
  };

  const calculateAdherence = () => {
    if (medications.length === 0) return 'N/A';
    const total = medications.length;
    const takenCount = medications.filter(med => med.takenToday).length;
    return ((takenCount / total) * 100).toFixed(0) + '%';
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <h3>Adherence: {calculateAdherence()}</h3>
      </div>
      <div>
        <h3>Add Medication</h3>
        <form onSubmit={handleAddMedication} noValidate>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newMed.name}
            onChange={handleInputChange}
            disabled={adding}
            required
          />
          <input
            type="text"
            name="dosage"
            placeholder="Dosage"
            value={newMed.dosage}
            onChange={handleInputChange}
            disabled={adding}
            required
          />
          <input
            type="text"
            name="frequency"
            placeholder="Frequency"
            value={newMed.frequency}
            onChange={handleInputChange}
            disabled={adding}
            required
          />
          <button type="submit" disabled={adding}>
            {adding ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
      <div>
        <h3>Medications</h3>
        {loading ? (
          <p>Loading medications...</p>
        ) : (
          <ul>
            {medications.map((med) => (
              <li key={med.id}>
                <strong>{med.name}</strong> - {med.dosage} - {med.frequency} - Taken Today: {med.takenToday ? 'Yes' : 'No'}
                {!med.takenToday && (
                  <button onClick={() => handleMarkTaken(med.id)}>Mark as Taken</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
