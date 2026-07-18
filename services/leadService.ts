import type { Lead } from '@prisma/client'
import { prisma } from '../lib/prisma'

export type LeadInput = {
  name: string
  mobile: string
  status?: string
}

export type LeadUpdateInput = Partial<LeadInput>

const ALLOWED_UPDATE_FIELDS = ['name', 'mobile', 'status'] as const

export async function listLeads(): Promise<Lead[]> {
  return prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createLead(data: LeadInput): Promise<Lead> {
  const name = data.name.trim()
  const mobile = data.mobile.trim()

  if (!name) {
    throw new Error('Name is required')
  }
  if (!mobile) {
    throw new Error('Mobile is required')
  }

  return prisma.lead.create({
    data: {
      name,
      mobile,
      ...(data.status ? { status: data.status } : {}),
    },
  })
}

export async function updateLead(id: string, data: LeadUpdateInput): Promise<Lead | null> {
  const patch: Record<string, string> = {}
  for (const field of ALLOWED_UPDATE_FIELDS) {
    const value = data[field]
    if (typeof value === 'string') {
      patch[field] = value
    }
  }

  if (Object.keys(patch).length === 0) {
    throw new Error('No valid fields to update')
  }

  try {
    return await prisma.lead.update({ where: { id }, data: patch })
  } catch {
    return null
  }
}

export async function deleteLead(id: string): Promise<boolean> {
  try {
    await prisma.lead.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

/** Simple pipeline breakdown used by the dashboard overview. */
export async function leadStats() {
  const grouped = await prisma.lead.groupBy({
    by: ['status'],
    _count: { _all: true },
  })
  const total = grouped.reduce((sum, g) => sum + g._count._all, 0)
  return { total, byStatus: grouped.map(g => ({ status: g.status, count: g._count._all })) }
}
