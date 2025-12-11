import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Toolbar, Table, Field } from './components';

// PUBLIC_INTERFACE
export default function ExamsPage() {
  /** Exams list and form wired to FastAPI endpoints. */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ id: null, name: "", date: "", subject: "" });

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'subject', header: 'Subject' },
    { key: 'date', header: 'Date' }
  ];

  async function load() {
    try {
      setLoading(true);
      setError("");
      const data = await api.listExams(q);
      setItems(Array.isArray(data) ? data : (data?.items || []));
    } catch (e) {
      setError(e.message || "Failed to load exams");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startAdd() { setForm({ id: null, name: "", date: "", subject: "" }); }
  function startEdit(row) { setForm({ id: row.id, name: row.name || "", date: row.date || "", subject: row.subject || "" }); }

  async function save(e) {
    e.preventDefault();
    try {
      const payload = { name: form.name, date: form.date, subject: form.subject };
      if (form.id == null) await api.createExam(payload);
      else await api.updateExam(form.id, payload);
      await load();
      startAdd();
    } catch (e2) {
      setError(e2.message || "Failed to save");
    }
  }

  async function remove(row) {
    if (!window.confirm("Delete this exam?")) return;
    try {
      await api.deleteExam(row.id);
      await load();
    } catch (e2) {
      setError(e2.message || "Failed to delete");
    }
  }

  return (
    <div className="card">
      <Toolbar title="Exams" onAdd={startAdd}>
        <input className="input" placeholder="Search..." value={q} onChange={(e)=> setQ(e.target.value)} onKeyDown={(e)=> { if (e.key==='Enter') load(); }} />
        <button className="btn" onClick={load}>Search</button>
      </Toolbar>
      {error && <div style={{color:"#B91C1C", marginBottom: 8}} role="alert">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <Table columns={columns} rows={items} onEdit={startEdit} onDelete={remove} />
      )}

      <h3 style={{marginTop:16}}>{form.id == null ? "Add Exam" : `Edit Exam #${form.id}`}</h3>
      <form onSubmit={save} className="form-grid" aria-label="Exam form">
        <Field label="Name">
          <input className="input" required value={form.name} onChange={(e)=> setForm({...form, name: e.target.value})} />
        </Field>
        <Field label="Subject">
          <input className="input" required value={form.subject} onChange={(e)=> setForm({...form, subject: e.target.value})} />
        </Field>
        <Field label="Date">
          <input className="input" type="date" required value={form.date} onChange={(e)=> setForm({...form, date: e.target.value})} />
        </Field>
        <div style={{gridColumn:"1 / -1", display:"flex", gap:8}}>
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn" type="button" onClick={startAdd}>Clear</button>
        </div>
      </form>
    </div>
  );
}
