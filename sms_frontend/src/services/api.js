/**
 * Determine API base URL from env with sensible fallbacks.
 * Primary: REACT_APP_API_BASE_URL
 * Fallbacks: REACT_APP_BACKEND_URL, REACT_APP_API_BASE
 * Default: http://localhost:3001
 */
const ENV_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_BACKEND_URL ||
  process.env.REACT_APP_API_BASE ||
  "http://localhost:3001";

/**
 * Wraps fetch with JSON defaults and error handling.
 */
async function http(method, path, body) {
  const base = ENV_BASE?.replace(/\/+$/, ""); // trim trailing slash
  const url = `${base}${path}`;
  const init = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }
  let res;
  try {
    res = await fetch(url, init);
  } catch (networkErr) {
    throw new Error(`Network error contacting backend at ${base}: ${networkErr?.message || String(networkErr)}`);
  }
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = (data && (data.detail || data.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// PUBLIC_INTERFACE
export const api = {
  /** Teachers CRUD */
  listTeachers: (q = "") => http("GET", `/teachers${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  getTeacher: (id) => http("GET", `/teachers/${id}`),
  createTeacher: (payload) => http("POST", `/teachers`, payload),
  updateTeacher: (id, payload) => http("PUT", `/teachers/${id}`, payload),
  deleteTeacher: (id) => http("DELETE", `/teachers/${id}`),

  /** Students CRUD */
  listStudents: (q = "") => http("GET", `/students${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  getStudent: (id) => http("GET", `/students/${id}`),
  createStudent: (payload) => http("POST", `/students`, payload),
  updateStudent: (id, payload) => http("PUT", `/students/${id}`, payload),
  deleteStudent: (id) => http("DELETE", `/students/${id}`),

  /** Exams CRUD */
  listExams: (q = "") => http("GET", `/exams${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  getExam: (id) => http("GET", `/exams/${id}`),
  createExam: (payload) => http("POST", `/exams`, payload),
  updateExam: (id, payload) => http("PUT", `/exams/${id}`, payload),
  deleteExam: (id) => http("DELETE", `/exams/${id}`),

  /** Staff CRUD */
  listStaff: (q = "") => http("GET", `/staff${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  getStaff: (id) => http("GET", `/staff/${id}`),
  createStaff: (payload) => http("POST", `/staff`, payload),
  updateStaff: (id, payload) => http("PUT", `/staff/${id}`, payload),
  deleteStaff: (id) => http("DELETE", `/staff/${id}`)
};
