import LeadTable from "../../components/LeadTable"
import KanbanBoard from "../../components/KanbanBoard"
import { prisma } from "../../lib/prisma"

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const leads = await prisma.lead.findMany()
  return (
    <div>
      <h1>EMC CRM v1.2 Dashboard</h1>
      <KanbanBoard />
      <LeadTable leads={leads} />
    </div>
  )
}
