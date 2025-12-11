import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TeachersPage from './pages/Teachers';
import StudentsPage from './pages/Students';
import ExamsPage from './pages/Exams';
import StaffPage from './pages/Staff';
import './components/layout.css';

// PUBLIC_INTERFACE
function App() {
  /** Root App component defining routes and wrapping with sidebar layout. */
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
