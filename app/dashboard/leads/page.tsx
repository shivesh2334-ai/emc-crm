import { prisma } from "../../../lib/prisma"
import LeadTable from "../../../components/LeadTable"
import AddLeadForm from "../../../components/AddLeadForm"

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const raw = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
  const leads = raw.map(l => ({ ...l, createdAt: l.createdAt.toISOString(), updatedAt: l.updatedAt.toISOString() }))

  return (
    <div>
      <div className="dash-header">
        <h1>Lead Pipeline</h1>
        <AddLeadForm />
      </div>
      <LeadTable leads={leads} />
    </div>
  )
}