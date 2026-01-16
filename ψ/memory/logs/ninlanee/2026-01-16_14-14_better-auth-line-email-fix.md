---
project: ninlanee
issue: #none
tags: []
date: 2026-01-16
agent: oracle-keeper
---

# Snapshot: Better Auth Line Email Fix & Build Verification

**Time**: 2026-01-16 14:14
**Context**: Fixing the `email_not_found` error during LINE Login in the Ninlanee Farm project. This error occurs because Better Auth requires an email, but LINE API often returns null.

## Insight

1.  **Placeholder Strategy**: Applied the "Placeholder Mapping" pattern from `mmv-tarots`.
    -   File: `lib/auth.ts`
    -   Logic: `email: profile.email || \`${profile.sub}@line.ninlanee.com\``
    -   Result: Creates a predictable, unique email for every LINE user, satisfying the database constraint.
2.  **Build Verification**: Ran `npm run build` to ensure the fix doesn't introduce type errors or build failures.
    -   Status: **Passed 100%**
    -   Next.js 16.1.2 (Turbopack)
3.  **Future Consideration**: These placeholder emails are internal-only. If we need to contact users, we should ask for a real email in the "Profile Settings" later.

## Apply When

- Setting up Better Auth with providers that don't enforce email (LINE, Phone Auth).
- Encountering generic "Provider did not return ..." errors.

## Tags
`better-auth` `line-login` `fix` `build-passed`
