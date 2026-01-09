# Current Focus 🎯

**State**: completed
**Task**: Implementation: Burst & Breathe Cooldown System (mmv-tarots)
**Issue**: #none
**Snapshots**: 
- [2026-01-08_22-43_burst-breathe-blueprint.md](../memory/logs/mmv-tarots/2026-01-08_22-43_burst-breathe-blueprint.md)
- [2026-01-08_23-55_stale-quota-deep-dive.md](../memory/logs/mmv-tarots/2026-01-08_23-55_stale-quota-deep-dive.md)
- [2026-01-09_00-30_burst-breathe-final-polish.md](../memory/logs/mmv-tarots/2026-01-09_00-30_burst-breathe-final-polish.md)
**Retrospective**: [2026-01-09/00.23_burst-and-breathe-ux.md](../memory/retrospectives/2026-01/09/00.23_burst-and-breathe-ux.md)
**Learning**: [2026-01-09_stateless-rate-limiting-ux.md](../memory/learnings/2026-01-09_stateless-rate-limiting-ux.md)
**Since**: 2026-01-08 22:43 GMT+7

---

## Progress Summary
- [x] **Burst & Breathe Implementation**
  - [x] Switched to **Stateless Token Bucket** (no DB migration needed).
  - [x] Created `lib/server/rate-limit.ts` for capacity logic.
  - [x] Updated `/api/predict` to enforce dynamic cooldown.
  - [x] Updated `/api/credits/balance` to provide concentration data.
- [x] **Frontend UI Refinement**
  - [x] Implemented `QuestionInput` with 🔮 indicator logic.
  - [x] Fixed synchronization via `NavigationProvider`.
  - [x] Resolved "Invisible Icons" bug (Post-mortem in snapshot).

---
*Next Move: User verification on next question burst.*
- [ ] แก้ไขปัญหา Quota ไม่รีเฟรชอิงตามเวลาจริง (Stale State / Caching) #none
- [ ] Snapshot แผนการแก้ไข "The Invisible Refill" ปัญหา Caching และ Logic Boundary
- [ ] **Phase 4: Verification**
  - [ ] Test consecutive 3-question bursts.
  - [ ] Verify 30s delay enforcement.

---

### History (Pinned)
- [x] #none - Lab Tooling: Royal Form Export Prototype (FINAL)
  - Successfully built Python CLI for legacy Excel export.
- [x] #none - Implement Referral Program x Social Sharing
  - Implemented on branch `feat/referral-sharing` -> Merged to `staging`.







