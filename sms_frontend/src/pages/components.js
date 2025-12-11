import React from 'react';

export function Toolbar({ title, onAdd, children }) {
  return (
    <div className="toolbar">
      <h2 style={{margin: 0}}>{title}</h2>
      <div style={{display:"flex", gap:8}}>
        {children}
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>+ Add</button>}
      </div>
    </div>
  );
}

export function Table({ columns, rows, onEdit, onDelete }) {
  return (
    <table className="table" role="table">
      <thead>
        <tr>
          {columns.map((c) => <th key={c.key}>{c.header}</th>)}
          {(onEdit || onDelete) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={columns.length + ((onEdit||onDelete)?1:0)}>No records found.</td></tr>
        ) : rows.map((r) => (
          <tr key={r.id || r.uuid || JSON.stringify(r)}>
            {columns.map((c) => <td key={c.key}>{String(r[c.key] ?? '')}</td>)}
            {(onEdit || onDelete) && (
              <td style={{display:"flex", gap:8}}>
                {onEdit && <button className="btn" onClick={() => onEdit(r)}>Edit</button>}
                {onDelete && <button className="btn btn-danger" onClick={() => onDelete(r)}>Delete</button>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Field({ label, children }) {
  return (
    <div className="form-row">
      <label><strong>{label}</strong></label>
      {children}
    </div>
  );
}
