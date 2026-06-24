export const canManageLeads = (role: string) =>
  ['ADMIN', 'MARKETING_MANAGER'].includes(role)