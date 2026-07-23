# EMC CRM Core v2.0

Production foundation — Next.js 15, Prisma 6, Clerk auth, Supabase PostgreSQL.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values before running locally.

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Supabase **pooler** URL (port 6543, `?pgbouncer=true`). Used at runtime by Prisma. |
| `DIRECT_URL` | ✅ | Supabase **direct** URL (port 5432). Used by `prisma migrate deploy` and `prisma db push`. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key (`pk_…`). |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key (`sk_…`). |

### Supabase Connection String Format

Find both strings in your Supabase project under **Settings → Database → Connection string**.

```
# Pooler (Transaction mode) — use for DATABASE_URL
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

# Direct — use for DIRECT_URL
postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### Vercel Deployment

Set all four environment variables in your Vercel project under
**Settings → Environment Variables** for the Production, Preview, and Development environments.

## Database Setup

Apply the schema to a fresh Supabase database:

```bash
# Option A — Prisma managed migrations (recommended)
npx prisma migrate deploy

# Option B — paste prisma/migration.sql directly into the Supabase SQL editor
```

## Build

```bash
npm ci
npx prisma validate
npm run build
```

## Roles

API mutations (`POST`, `PATCH`, `DELETE`, and `GET /api/leads`) are restricted to users
with a Clerk `public_metadata.role` of `ADMIN` or `MARKETING_MANAGER`.
