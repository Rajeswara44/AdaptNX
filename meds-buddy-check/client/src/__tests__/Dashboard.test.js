import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('Dashboard Component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser', role: 'patient' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders medication list', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Ibuprofen', dosage: '200mg', frequency: 'Once a day' },
        { id: 2, name: 'Paracetamol', dosage: '500mg', frequency: 'Twice a day' }
      ]
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading medications/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Medication List/i)).toBeInTheDocument();
      expect(screen.getByText(/Ibuprofen/i)).toBeInTheDocument();
      expect(screen.getByText(/Paracetamol/i)).toBeInTheDocument();
    });
  });

  test('shows error if user not logged in', async () => {
    localStorage.clear();

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/User not logged in/i)).toBeInTheDocument();
    });
  });
});
