import { NextResponse } from 'next/server'
import { requireManageLeads } from '../../../../lib/auth'
import { deleteLead, updateLead } from '../../../../services/leadService'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = await requireManageLeads()
  if (!access.ok) {
    return NextResponse.json({ error: 'Forbidden' }, { status: access.status })
  }

  const { id } = await params
  const body = await req.json().catch(() => null)

  try {
    const lead = await updateLead(id, body ?? {})
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }
    return NextResponse.json(lead)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update lead'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = await requireManageLeads()
  if (!access.ok) {
    return NextResponse.json({ error: 'Forbidden' }, { status: access.status })
  }

  const { id } = await params
  const ok = await deleteLead(id)
  if (!ok) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
