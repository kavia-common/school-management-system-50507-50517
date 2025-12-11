import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';

// PUBLIC_INTERFACE
export default function Layout() {
  /** Layout component with left sidebar and main content area. */
  return (
    <div className="app-shell" role="application" aria-label="School Management System">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="brand">
          <span className="brand-logo" aria-hidden="true">🏫</span>
          <div className="brand-text">
            <strong>School MS</strong>
            <small>Traditional Gray</small>
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/" end className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Dashboard</NavLink>
          <NavLink to="/teachers" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Teachers</NavLink>
          <NavLink to="/students" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Students</NavLink>
          <NavLink to="/exams" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Exams</NavLink>
          <NavLink to="/staff" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Staff</NavLink>
        </nav>
        <footer className="sidebar-footer">
          <small>© {new Date().getFullYear()} SMS</small>
        </footer>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
