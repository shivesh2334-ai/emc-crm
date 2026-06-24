import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const leads = await prisma.lead.findMany()
  return NextResponse.json(leads)
}

export async function POST(req: Request) {
  const body = await req.json()
  const lead = await prisma.lead.create({ data: body })
  return NextResponse.json(lead)
}
