# Snapshot: Block 1.2 Database Wiring Completed

**Time**: 2026-01-16 09:00 GMT+7
**Context**: Connected Next.js to Supabase via Prisma.

## Achievements
- [x] Installed `prisma` & `@prisma/client`.
- [x] **Downgraded to Prisma 6.19.2** for stability (Prisma 7 introduces breaking config changes).
- [x] Applied `schema.prisma` with Users, Sessions, Chickens, Pedigree, and Verification tables.
- [x] Executed `npx prisma db push` successfully (synced with Supabase).
- [x] Created `lib/db.ts` Singleton Client.
- [x] Verified `npm run build` passed 100%.

## Details
- **Schema**: Supports CUID, Self-Relation (Sire/Dam), and LINE Login fields.
- **Connection**: Uses `DATABASE_URL` (Pooled) and `DIRECT_URL`.
- **Warning**: Dropped existing tables (`_sqlx_migrations`, `prompts`) from the target DB (User confirmed indirect/implicit by providing this DB).

## Next Step
- Block 1.3: Better Auth & LINE Login.

## Tags
`ninlanee` `prisma` `database` `supabase` `block-1-2`
