"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]

export default function AddLeadForm() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [status, setStatus] = useState("NEW")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const reset = () => {
    setName("")
    setMobile("")
    setStatus("NEW")
    setError("")
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), mobile: mobile.trim(), status }),
    })
    setLoading(false)
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? "Failed to create lead")
      return
    }
    reset()
    setOpen(false)
    router.refresh()
  }

  if (!open) {
    return (
      <button className="btn-primary" onClick={() => setOpen(true)}>
        + Add Lead
      </button>
    )
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 style={{ marginTop: 0 }}>New Lead</h2>
        <form onSubmit={submit} className="lead-form">
          <label>
            Name
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full name"
              required
            />
          </label>
          <label>
            Mobile
            <input
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder="+91 98765 43210"
              required
            />
          </label>
          <label>
            Status
            <select value={status} onChange={e => setStatus(e.target.value)}>
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving…" : "Create"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => { reset(); setOpen(false) }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
