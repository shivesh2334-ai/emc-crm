import LeadTable from "../../components/LeadTable"
import KanbanBoard from "../../components/KanbanBoard"
import AddLeadForm from "../../components/AddLeadForm"
import { prisma } from "../../lib/prisma"

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const raw = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
  const leads = raw.map(l => ({ ...l, createdAt: l.createdAt.toISOString(), updatedAt: l.updatedAt.toISOString() }))

  const total = leads.length
  const byStatus = leads.reduce((acc: Record<string, number>, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, {})

  return (
    <div>
      <div className="dash-header">
        <h1>Overview</h1>
        <AddLeadForm />
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Leads</div>
          <div className="stat-value">{total}</div>
        </div>
        {["NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map(s => (
          <div key={s} className="stat-card">
            <div className="stat-label">{s}</div>
            <div className="stat-value">{byStatus[s] ?? 0}</div>
          </div>
        ))}
      </div>
      <h2>Pipeline</h2>
      <KanbanBoard leads={leads} />
      <h2 style={{ marginTop: "2rem" }}>All Leads</h2>
      <LeadTable leads={leads} />
    </div>
  )
}
