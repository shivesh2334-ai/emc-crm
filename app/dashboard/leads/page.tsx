import { listLeads } from "../../../services/leadService"
import LeadsView from "../../../components/LeadsView"
import AddLeadForm from "../../../components/AddLeadForm"

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const raw = await listLeads()
  const leads = raw.map(l => ({ ...l, createdAt: l.createdAt.toISOString(), updatedAt: l.updatedAt.toISOString() }))

  return (
    <div>
      <div className="dash-header">
        <h1>Lead Pipeline</h1>
        <AddLeadForm />
      </div>
      <LeadsView leads={leads} />
    </div>
  )
}
