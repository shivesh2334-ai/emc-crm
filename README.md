
# EMC CRM Core v1.2

Features:
- Dashboard scaffold
- Lead pipeline scaffold
- RBAC helper
- Updated Prisma schema
- Lead API foundation

Next:
- Clerk protected routes
- ShadCN UI
- CSV import/export
- Audit logs

## Deployment checklist

Ensure these environment variables are configured in your deployment platform and CI:
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## Deployment debugging flow

1. Identify the exact failing stage: dependency install, Prisma generate, Next.js build, or runtime start.
2. Verify the required environment variables above are present and valid.
3. Run the production build path used by CI:
   - `npm ci`
   - `npx prisma generate`
   - `npm run build`
4. If build passes but runtime fails, start the app with `npm run start` and check route auth behavior (`/` redirects to `/dashboard`).
5. In CI logs, focus on the first concrete error line rather than the final summary message.
