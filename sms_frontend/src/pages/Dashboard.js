import React from 'react';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Simple dashboard card with quick intro. */
  return (
    <div className="card">
      <h2>Welcome to the School Management System</h2>
      <p className="subtitle">Use the sidebar to manage Teachers, Students, Exams, and Staff.</p>
    </div>
  );
}
