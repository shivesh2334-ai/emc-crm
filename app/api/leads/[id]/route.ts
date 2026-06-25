import { prisma } from '../../../../lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { canManageLeads } from '../../../../lib/rbac'

const ALLOWED_FIELDS = ['name', 'mobile', 'status'] as const

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { sessionClaims } = await auth()
  const role = (sessionClaims?.role as string) ?? 'NONE'

  if (!canManageLeads(role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const body = await req.json()

  const data: Record<string, string> = {}
  for (const field of ALLOWED_FIELDS) {
    if (typeof body?.[field] === 'string') {
      data[field] = body[field]
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  try {
    const lead = await prisma.lead.update({ where: { id }, data })
    return NextResponse.json(lead)
  } catch {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }
}
