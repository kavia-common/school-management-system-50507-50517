import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Toolbar, Table, Field } from './components';

// PUBLIC_INTERFACE
export default function TeachersPage() {
  /** Teachers list and form for create/update, aligned with backend schemas. */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    phone: ""
  });

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'first_name', header: 'First name' },
    { key: 'last_name', header: 'Last name' },
    { key: 'email', header: 'Email' },
    { key: 'subject', header: 'Subject' },
    { key: 'phone', header: 'Phone' }
  ];

  async function load() {
    try {
      setLoading(true);
      setError("");
      const data = await api.listTeachers(q);
      setItems(Array.isArray(data) ? data : (data?.items || []));
    } catch (e) {
      setError(e.message || "Failed to load teachers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // initial

  function startAdd() {
    setForm({ id: null, first_name: "", last_name: "", email: "", subject: "", phone: "" });
  }
  function startEdit(row) {
    setForm({
      id: row.id,
      first_name: row.first_name || "",
      last_name: row.last_name || "",
      email: row.email || "",
      subject: row.subject || "",
      phone: row.phone || ""
    });
  }
  async function save(e) {
    e.preventDefault();
    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email || null,
        subject: form.subject || null,
        phone: form.phone || null
      };
      if (form.id == null) {
        await api.createTeacher(payload);
      } else {
        await api.updateTeacher(form.id, payload);
      }
      await load();
      startAdd();
    } catch (e2) {
      setError(e2.message || "Failed to save");
    }
  }
  async function remove(row) {
    if (!window.confirm("Delete this teacher?")) return;
    try {
      await api.deleteTeacher(row.id);
      await load();
    } catch (e2) {
      setError(e2.message || "Failed to delete");
    }
  }

  return (
    <div className="card">
      <Toolbar title="Teachers" onAdd={startAdd}>
        <input
          className="input"
          placeholder="Search..."
          value={q}
          onChange={(e)=> setQ(e.target.value)}
          onKeyDown={(e)=> { if (e.key === 'Enter') load(); }}
          aria-label="Search teachers"
        />
        <button className="btn" onClick={load}>Search</button>
      </Toolbar>
      {error && <div style={{color:"#B91C1C", marginBottom: 8}} role="alert">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <Table columns={columns} rows={items} onEdit={startEdit} onDelete={remove} />
      )}

      <h3 style={{marginTop:16}}>{form.id == null ? "Add Teacher" : `Edit Teacher #${form.id}`}</h3>
      <form onSubmit={save} className="form-grid" aria-label="Teacher form">
        <Field label="First name">
          <input className="input" required value={form.first_name} onChange={(e)=> setForm({...form, first_name: e.target.value})} />
        </Field>
        <Field label="Last name">
          <input className="input" required value={form.last_name} onChange={(e)=> setForm({...form, last_name: e.target.value})} />
        </Field>
        <Field label="Email (optional)">
          <input className="input" type="email" value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} />
        </Field>
        <Field label="Subject (optional)">
          <input className="input" value={form.subject} onChange={(e)=> setForm({...form, subject: e.target.value})} />
        </Field>
        <Field label="Phone (optional)">
          <input className="input" value={form.phone} onChange={(e)=> setForm({...form, phone: e.target.value})} />
        </Field>
        <div style={{gridColumn:"1 / -1", display:"flex", gap:8}}>
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn" type="button" onClick={startAdd}>Clear</button>
        </div>
      </form>
    </div>
  );
}
