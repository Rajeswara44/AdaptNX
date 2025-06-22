import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import NotificationSettings from './components/NotificationSettings';
import PhotoUpload from './components/PhotoUpload';
import CaretakerDashboard from './components/CaretakerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notification-settings" element={<NotificationSettings />} />
        <Route path="/photo-upload" element={<PhotoUpload />} />
        <Route path="/caretaker-dashboard" element={<CaretakerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
