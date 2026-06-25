import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { canManageLeads } from '../../../lib/rbac'

export async function GET() {
  const leads = await prisma.lead.findMany()
  return NextResponse.json(leads)
}

export async function POST(req: Request) {
  const { sessionClaims } = await auth()
  const role = (sessionClaims?.role as string) ?? 'NONE'

  if (!canManageLeads(role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { name, mobile, status } = body ?? {}

  if (typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }
  if (typeof mobile !== 'string' || !mobile.trim()) {
    return NextResponse.json({ error: 'mobile is required' }, { status: 400 })
  }

  const lead = await prisma.lead.create({
    data: {
      name: name.trim(),
      mobile: mobile.trim(),
      ...(typeof status === 'string' ? { status } : {}),
    },
  })
  return NextResponse.json(lead)
}
