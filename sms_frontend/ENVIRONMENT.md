# Environment configuration

- PUBLIC_INTERFACE
- Primary variable: set REACT_APP_API_BASE_URL to your FastAPI backend base URL.
- Supported fallbacks (optional): REACT_APP_BACKEND_URL or REACT_APP_API_BASE if the primary is not set.
- For local dev, one of the following will work (prefer the primary):
  REACT_APP_API_BASE_URL=http://localhost:3001
  # or
  # REACT_APP_BACKEND_URL=http://localhost:3001
  # REACT_APP_API_BASE=http://localhost:3001

Create a .env file in this folder with the variable above or export it in your environment before running `npm start`.

A sample .env.example is included. Copy it to `.env` and adjust as needed.
