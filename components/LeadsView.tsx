"use client"
import { useState } from "react"
import LeadTable from "./LeadTable"
import KanbanBoard from "./KanbanBoard"

import { Lead } from "../types/lead"

export default function LeadsView({ leads }: { leads: Lead[] }) {
  const [view, setView] = useState<"table" | "board">("table")

  return (
    <div>
      <div className="view-toggle">
        <button
          className={view === "table" ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setView("table")}
        >
          Table
        </button>
        <button
          className={view === "board" ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setView("board")}
        >
          Board
        </button>
      </div>
      {view === "table" ? <LeadTable leads={leads} /> : <KanbanBoard leads={leads} />}
    </div>
  )
}
