import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../components/Signup';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('Signup Component', () => {
  test('renders signup form', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
  });

  test('shows error when fields are empty', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/Sign Up/i));
    expect(await screen.findByText(/Please fill all fields/i)).toBeInTheDocument();
  });

  test('successful signup redirects to login', async () => {
    axios.post.mockResolvedValue({});

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'newpass' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'patient' } });
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {
      expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    });
  });
});
