import { prisma } from '../lib/prisma'

export type LeadInput = {
  name: string
  mobile: string
  status?: string
}

export function createLead(data: LeadInput) {
  return prisma.lead.create({
    data: {
      name: data.name.trim(),
      mobile: data.mobile.trim(),
      ...(data.status ? { status: data.status } : {}),
    },
  })
}