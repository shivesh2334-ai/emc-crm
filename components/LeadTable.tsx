"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Lead = { id: string; name: string; mobile: string; status: string; createdAt: string }

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]

export default function LeadTable({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial)
  const [editing, setEditing] = useState<Lead | null>(null)
  const router = useRouter()

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return
    const res = await fetch(`/api/leads/${id}`, { method: "DELETE" })
    if (res.ok) setLeads(prev => prev.filter(l => l.id !== id))
  }

  const saveEdit = async () => {
    if (!editing) return
    const res = await fetch(`/api/leads/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editing.name, mobile: editing.mobile, status: editing.status }),
    })
    if (res.ok) {
      const updated = await res.json()
      setLeads(prev => prev.map(l => l.id === updated.id ? updated : l))
      setEditing(null)
    }
  }

  return (
    <>
      {editing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ marginTop: 0 }}>Edit Lead</h2>
            <div className="lead-form">
              <label>
                Name
                <input
                  value={editing.name}
                  onChange={e => setEditing({ ...editing, name: e.target.value })}
                />
              </label>
              <label>
                Mobile
                <input
                  value={editing.mobile}
                  onChange={e => setEditing({ ...editing, mobile: e.target.value })}
                />
              </label>
              <label>
                Status
                <select
                  value={editing.status}
                  onChange={e => setEditing({ ...editing, status: e.target.value })}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <div className="modal-actions">
                <button onClick={saveEdit} className="btn-primary">Save</button>
                <button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "var(--muted)" }}>
                No leads yet
              </td>
            </tr>
          )}
          {leads.map(l => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>{l.mobile}</td>
              <td>
                <span className={`status-badge status-${l.status.toLowerCase()}`}>
                  {l.status}
                </span>
              </td>
              <td>{new Date(l.createdAt).toLocaleDateString()}</td>
              <td style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn-ghost" onClick={() => setEditing(l)}>Edit</button>
                <button className="btn-danger" onClick={() => deleteLead(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
