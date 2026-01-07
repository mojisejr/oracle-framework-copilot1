# Current Focus 🎯

- [x] Implement Referral Program x Social Sharing
  - [x] Research & Architect Snapshot (Snapshot ID: 2026-01-07_referral-blueprint)
  - [x] Update `share-actions.tsx` to include `ref` param (Phase 1)
  - [x] Finalize `middleware.ts` cookie capture (Phase 2 - Verified)
  - [x] Implement Better-Auth Post-Login Hooks for attribution (Phase 3)
  - [x] Phase 4: UI/UX Feedback (Banner & "Ask More" button)
  - [x] Engagement Refactor (History -> Home)
  - [x] Merge to Staging & Push to Remote

## Context
- Implemented on branch `feat/referral-sharing` -> Merged to `staging`.
- Logic:
  - Client sends `?ref=...`
  - Middleware saves cookie `mmv_ref`.
  - Auth Hook (Server) reads cookie, links user, grants stars (5 for referee, 10 for referrer).
- UI:
  - Welcome Gift Banner on Share view.
  - "Ask More" (กลับไปถามต่อ) button in History Detail to drive re-engagement.
- Session Status: **COMPLETE & PUSHED**.







