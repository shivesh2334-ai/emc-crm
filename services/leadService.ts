export type LeadInput = {
  name: string
  mobile: string
  status?: string
}

export async function createLead(data: LeadInput) {
  return data
}