# Medication Management System

## Project Overview

This project is a Medication Management application designed for both patients and caretakers. It provides role-based dashboards, medication tracking, and essential features to help users manage medication schedules effectively.

## Technology Stack

- **Frontend:** React, JavaScript, React Query, CSS
- **Backend:** Node.js, Express, SQLite

## Features Implemented (Phase 1)

- User Authentication with SQLite (signup and login)
- Medication Management (CRUD operations)
- Patient Dashboard connected to real data from SQLite backend
- Form validation, loading and error states handling
- Sample user credentials seeded for testing

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```
   cd meds-buddy-check/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Seed sample users:
   ```
   node scripts/seedUsers.js
   ```

4. Start the backend server:
   ```
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

### Frontend

1. Navigate to the client directory:
   ```
   cd meds-buddy-check/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```
   The frontend will run on `http://localhost:3000` (or another port if 3000 is in use).

## Sample User Credentials

- Patient:
  - Username: `patient1`
  - Password: `patientpass`

- Caretaker:
  - Username: `caretaker1`
  - Password: `caretakerpass`

## Running Tests

Tests are written using Vitest.

To run tests:

- For backend tests:
  ```
  npm test
  ```
  Run this command in the backend directory.

- For frontend tests:
  ```
  npm test
  ```
  Run this command in the client directory.

## Notes

- Ensure the backend server is running before starting the frontend to enable API communication.
- The current implementation covers Phase 1 requirements.
- Further enhancements and testing can be added as needed.
