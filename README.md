# EMC CRM Core v2.0

Production foundation.

## Environment

Configure these variables before building or deploying:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## Build

```bash
npm ci
npx prisma validate
npm run build
```
