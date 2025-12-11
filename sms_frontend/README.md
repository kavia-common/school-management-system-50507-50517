# School Management System - Frontend SPA

This React SPA provides a left sidebar navigation and CRUD screens for Teachers, Students, Exams, and Staff. It interacts with the FastAPI backend over REST.

## Quick start

- Copy `.env.example` to `.env` and set the backend base URL
  - `REACT_APP_API_BASE_URL=http://localhost:3001` (or the running backend URL)
- Install and start:
  - `npm install`
  - `npm start`

## Pages

- Dashboard
- Teachers: list/create/edit/delete with basic form and table
- Students: list/create/edit/delete with basic form and table
- Exams: list/create/edit/delete with basic form and table
- Staff: list/create/edit/delete with basic form and table

## Notes

- All API calls are made via `src/services/api.js` and respect `REACT_APP_API_BASE_URL`.
- If your backend uses different field names or paths, adjust endpoints in `api.js`.
