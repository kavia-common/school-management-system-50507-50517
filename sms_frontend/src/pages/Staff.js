import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Toolbar, Table, Field } from './components';

// PUBLIC_INTERFACE
export default function StaffPage() {
  /** Staff list and form wired to FastAPI endpoints. */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ id: null, name: "", role: "", email: "" });

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'email', header: 'Email' }
  ];

  async function load() {
    try {
      setLoading(true);
      setError("");
      const data = await api.listStaff(q);
      setItems(Array.isArray(data) ? data : (data?.items || []));
    } catch (e) {
      setError(e.message || "Failed to load staff");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startAdd() { setForm({ id: null, name: "", role: "", email: "" }); }
  function startEdit(row) { setForm({ id: row.id, name: row.name || "", role: row.role || "", email: row.email || "" }); }

  async function save(e) {
    e.preventDefault();
    try {
      const payload = { name: form.name, role: form.role, email: form.email };
      if (form.id == null) await api.createStaff(payload);
      else await api.updateStaff(form.id, payload);
      await load();
      startAdd();
    } catch (e2) {
      setError(e2.message || "Failed to save");
    }
  }

  async function remove(row) {
    if (!window.confirm("Delete this staff member?")) return;
    try {
      await api.deleteStaff(row.id);
      await load();
    } catch (e2) {
      setError(e2.message || "Failed to delete");
    }
  }

  return (
    <div className="card">
      <Toolbar title="Staff" onAdd={startAdd}>
        <input className="input" placeholder="Search..." value={q} onChange={(e)=> setQ(e.target.value)} onKeyDown={(e)=> { if (e.key==='Enter') load(); }} />
        <button className="btn" onClick={load}>Search</button>
      </Toolbar>
      {error && <div style={{color:"#B91C1C", marginBottom: 8}} role="alert">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <Table columns={columns} rows={items} onEdit={startEdit} onDelete={remove} />
      )}

      <h3 style={{marginTop:16}}>{form.id == null ? "Add Staff" : `Edit Staff #${form.id}`}</h3>
      <form onSubmit={save} className="form-grid" aria-label="Staff form">
        <Field label="Name">
          <input className="input" required value={form.name} onChange={(e)=> setForm({...form, name: e.target.value})} />
        </Field>
        <Field label="Role">
          <input className="input" required value={form.role} onChange={(e)=> setForm({...form, role: e.target.value})} />
        </Field>
        <Field label="Email">
          <input className="input" type="email" value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} />
        </Field>
        <div style={{gridColumn:"1 / -1", display:"flex", gap:8}}>
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn" type="button" onClick={startAdd}>Clear</button>
        </div>
      </form>
    </div>
  );
}
