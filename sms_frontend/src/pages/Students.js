import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Toolbar, Table, Field } from './components';

// PUBLIC_INTERFACE
export default function StudentsPage() {
  /** Students list and form wired to FastAPI endpoints (aligned schema). */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    grade: "",
    enrollment_date: ""
  });

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'first_name', header: 'First name' },
    { key: 'last_name', header: 'Last name' },
    { key: 'email', header: 'Email' },
    { key: 'grade', header: 'Grade' },
    { key: 'enrollment_date', header: 'Enrollment date' }
  ];

  async function load() {
    try {
      setLoading(true);
      setError("");
      const data = await api.listStudents(q);
      setItems(Array.isArray(data) ? data : (data?.items || []));
    } catch (e) {
      setError(e.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startAdd() {
    setForm({ id: null, first_name: "", last_name: "", email: "", grade: "", enrollment_date: "" });
  }
  function startEdit(row) {
    setForm({
      id: row.id,
      first_name: row.first_name || "",
      last_name: row.last_name || "",
      email: row.email || "",
      grade: row.grade || "",
      enrollment_date: row.enrollment_date || ""
    });
  }

  async function save(e) {
    e.preventDefault();
    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email || null,
        grade: form.grade || null,
        enrollment_date: form.enrollment_date || null
      };
      if (form.id == null) await api.createStudent(payload);
      else await api.updateStudent(form.id, payload);
      await load();
      startAdd();
    } catch (e2) {
      setError(e2.message || "Failed to save");
    }
  }

  async function remove(row) {
    if (!window.confirm("Delete this student?")) return;
    try {
      await api.deleteStudent(row.id);
      await load();
    } catch (e2) {
      setError(e2.message || "Failed to delete");
    }
  }

  return (
    <div className="card">
      <Toolbar title="Students" onAdd={startAdd}>
        <input className="input" placeholder="Search..." value={q} onChange={(e)=> setQ(e.target.value)} onKeyDown={(e)=> { if (e.key==='Enter') load(); }} />
        <button className="btn" onClick={load}>Search</button>
      </Toolbar>
      {error && <div style={{color:"#B91C1C", marginBottom: 8}} role="alert">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <Table columns={columns} rows={items} onEdit={startEdit} onDelete={remove} />
      )}

      <h3 style={{marginTop:16}}>{form.id == null ? "Add Student" : `Edit Student #${form.id}`}</h3>
      <form onSubmit={save} className="form-grid" aria-label="Student form">
        <Field label="First name">
          <input className="input" required value={form.first_name} onChange={(e)=> setForm({...form, first_name: e.target.value})} />
        </Field>
        <Field label="Last name">
          <input className="input" required value={form.last_name} onChange={(e)=> setForm({...form, last_name: e.target.value})} />
        </Field>
        <Field label="Email (optional)">
          <input className="input" type="email" value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} />
        </Field>
        <Field label="Grade (optional)">
          <input className="input" value={form.grade} onChange={(e)=> setForm({...form, grade: e.target.value})} />
        </Field>
        <Field label="Enrollment date (YYYY-MM-DD, optional)">
          <input className="input" type="date" value={form.enrollment_date} onChange={(e)=> setForm({...form, enrollment_date: e.target.value})} />
        </Field>
        <div style={{gridColumn:"1 / -1", display:"flex", gap:8}}>
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn" type="button" onClick={startAdd}>Clear</button>
        </div>
      </form>
    </div>
  );
}
