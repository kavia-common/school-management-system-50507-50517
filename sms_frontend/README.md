# School Management System - Frontend SPA

This React SPA provides a left sidebar navigation and CRUD screens for Teachers, Students, Exams, and Staff. It interacts with the FastAPI backend over REST.

## Quick start

- Copy `.env.example` to `.env` and set the backend base URL
  - `REACT_APP_API_BASE_URL=http://localhost:3001` (or the running backend URL)
  - Optional fallbacks supported if the primary is not set: `REACT_APP_BACKEND_URL` or `REACT_APP_API_BASE`
- Install and start:
  - `npm install`
  - `npm start`

## Pages

- Dashboard
- Teachers: list/create/edit/delete with basic form and table
  - Fields: first_name, last_name, email (optional), subject (optional), phone (optional)
- Students: list/create/edit/delete with basic form and table
  - Fields: first_name, last_name, email (optional), grade (optional), enrollment_date (YYYY-MM-DD, optional)
- Exams: list/create/edit/delete with basic form and table
  - Fields: title, subject, exam_date (YYYY-MM-DD), description (optional)
- Staff: list/create/edit/delete with basic form and table
  - Fields: first_name, last_name, email (optional), role (optional), phone (optional)

## Notes

- All API calls are made via `src/services/api.js` and primarily use `REACT_APP_API_BASE_URL`. Fallbacks: `REACT_APP_BACKEND_URL`, `REACT_APP_API_BASE`.
- REST paths used: `/teachers`, `/students`, `/exams`, `/staff` and `/{id}` for item operations.
