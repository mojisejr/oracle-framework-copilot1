# Learning: Next.js Environment Variables & Better Auth on Vercel

**Date**: 2025-12-28
**Project**: mmv-tarots
**Context**: Debugging `ERR_CONNECTION_REFUSED` on Vercel deployment.

## The Problem
After deploying to Vercel, the application failed to fetch session data and social login failed with `net::ERR_CONNECTION_REFUSED` because it was trying to call `http://localhost:3000/api/auth/...`.

## Key Insights

### 1. The `NEXT_PUBLIC_` Prefix Rule
In Next.js, environment variables are only available in the Node.js environment (Server-side). To expose a variable to the browser (Client-side), it **MUST** be prefixed with `NEXT_PUBLIC_`.
- `BETTER_AUTH_URL`: Accessible only in `auth.ts` (Server).
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Accessible in `auth-client.ts` (Client).

### 2. The Fallback Trap
Hardcoding a fallback like `process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000'` in client-side code is dangerous. If the environment variable is missing in Vercel, the browser will try to connect to the user's own machine (`localhost`), leading to connection errors.

### 3. Relative Paths for Same-Domain API
If the Better Auth API routes (`/api/auth/*`) are hosted on the same domain as the frontend (standard Next.js setup), the `baseURL` in `createAuthClient` can be **omitted**.
- **Benefit**: The client will use relative paths, making it automatically compatible with any Vercel Preview URL without needing extra environment variables.

### 4. Vercel Interpolation
Using `https://${VERCEL_URL}` in Vercel's Environment Variable settings is the correct way to handle dynamic URLs for Preview branches, but it must be assigned to a `NEXT_PUBLIC_` variable if needed by the client.

## Corrective Action
- **Code**: Remove `baseURL` from `createAuthClient` or use `NEXT_PUBLIC_APP_URL`.
- **Vercel**: Ensure `NEXT_PUBLIC_` prefix is used for any variable needed by the browser.

## Resonance
"ความสวยงามของระบบไม่ได้อยู่ที่โค้ดที่ซับซ้อน แต่อยู่ที่ความเข้าใจในขอบเขต (Scope) ของการรันโค้ดระหว่าง Server และ Client"
