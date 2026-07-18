import { auth } from '@clerk/nextjs/server'
import { canManageLeads } from './rbac'

export async function requireAuth() {
  return auth()
}

/**
 * Resolves the caller's role from Clerk session claims and checks it
 * against canManageLeads. Used by every mutating API route so the
 * role-lookup + 403 logic lives in exactly one place.
 */
export async function requireManageLeads(): Promise<{ ok: boolean; status: number }> {
  const { sessionClaims } = await auth()
  const role = (sessionClaims?.public_metadata as { role?: string } | undefined)?.role ?? 'NONE'

  if (!canManageLeads(role)) {
    return { ok: false, status: 403 }
  }
  return { ok: true, status: 200 }
}
