# Learning: Stateless Rate-Limiting & The Caching Boundary

**Date**: 2026-01-09
**Context**: Re-implementing rate limits for `mmv-tarots` using Token Bucket.
**Role**: Oracle Keeper

## 💡 The Principle: "Stateless Intelligence, Explicit Delivery"

When building a system where the "State" is calculated on-the-fly from history (Stateless), the biggest enemy is **Information Stagnation** (Caching).

## 🧠 Insights

### 1. The Dynamic Requirement
In Next.js App Router, any API that returns calculated state based on "Now" (`new Date()`) **MUST** be forced into a dynamic mode.
```ts
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```
Without this, the server will serve a "Snapshot" from the build time or the first request, rendering your stateless logic useless after the first hit.

### 2. Floating Point Precision in Quotas
When mapping a continuous refill (e.g., `0.022 tokens/sec`) to discrete UI elements (e.g., 3 balls), always round the result to a safe precision (3-4 decimals) before floor-ing.
- Bad: `Math.floor(2.99999999)` -> `2` (Seems like refill is broken).
- Good: `Math.floor(Math.round(2.99999999 * 1000) / 1000)` -> `3`.

### 3. The Trust Interaction (Manual Refresh)
Even with perfect auto-polling, a **Manual Refresh** button serves a psychological purpose. It gives the user a sense of agency over their "Spiritual Concentration" and provides an escape hatch if the live sync lags.

## 🛠️ Pattern: The "No-Cache" Headers Stack
Always include these when data must be absolutely fresh:
```ts
{
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
}
```

## 🏷️ Tags
`nextjs-caching` `rate-limit` `token-bucket` `ux-design` `statelessness`
