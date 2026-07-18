import { NextResponse } from 'next/server'
import { requireManageLeads } from '../../../lib/auth'
import { createLead, listLeads } from '../../../services/leadService'

export async function GET() {
  const leads = await listLeads()
  return NextResponse.json(leads)
}

export async function POST(req: Request) {
  const access = await requireManageLeads()
  if (!access.ok) {
    return NextResponse.json({ error: 'Forbidden' }, { status: access.status })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body.name !== 'string' || typeof body.mobile !== 'string') {
    return NextResponse.json({ error: 'name and mobile are required' }, { status: 400 })
  }

  try {
    const lead = await createLead({ name: body.name, mobile: body.mobile, status: body.status })
    return NextResponse.json(lead)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create lead'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
