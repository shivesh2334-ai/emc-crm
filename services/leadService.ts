export type LeadInput = {
  name: string
  mobile: string
  status?: string
}

export function createLead(data: LeadInput) {
  return data
}