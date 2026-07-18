"use client"
import { useState } from "react"

import { Lead } from "../types/lead"

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]

export default function KanbanBoard({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial)

  const move = async (id: string, status: string) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    }
  }

  return (
    <div className="kanban-board">
      {STATUSES.map(col => {
        const colLeads = leads.filter(l => l.status === col)
        return (
          <div key={col} className="kanban-col">
            <div className="kanban-col-header">
              <span>{col}</span>
              <span className="kanban-count">{colLeads.length}</span>
            </div>
            {colLeads.map(lead => (
              <div key={lead.id} className="kanban-card">
                <div className="kanban-card-name">{lead.name}</div>
                <div className="kanban-card-mobile">{lead.mobile}</div>
                <div className="kanban-card-actions">
                  {STATUSES.filter(s => s !== col).map(s => (
                    <button
                      key={s}
                      className="kanban-move-btn"
                      onClick={() => move(lead.id, s)}
                    >
                      → {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {colLeads.length === 0 && (
              <div className="kanban-empty">No leads</div>
            )}
          </div>
        )
      })}
    </div>
  )
}