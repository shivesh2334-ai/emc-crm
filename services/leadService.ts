import { prisma } from '../lib/prisma'

export type LeadInput = {
  name: string
  mobile: string
  status?: string
}

export function createLead(data: LeadInput) {
  const name = data.name?.trim()
  const mobile = data.mobile?.trim()

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