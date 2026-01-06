**State**: completed
**Task**: Special Registration Link for jaothui-event
**Issue**: #none
**Snapshots**: 
- [2026-01-06_22-10_special-register-plan.md](../memory/logs/jaothui-event/2026-01-06_22-10_special-register-plan.md)
- [2026-01-06_22-35_special-register-implementation.md](../memory/logs/jaothui-event/2026-01-06_22-35_special-register-implementation.md)
**Retrospective**: [2026-01/06/22.39_special-registration-hack.md](../memory/retrospectives/2026-01/06/22.39_special-registration-hack.md)
**Since**: 2026-01-06 22:39 GMT+7

---

🔮 **Night Session - Special Registration Link Implementation** (Completed)
- [x] Create bypass registration page `src/pages/public/special-register/[eventId].tsx`.
- [x] Implement deadline-only validation logic.
- [x] Update `HistoryCard` to show "Register Again" button for rejected Royal events.
- [x] Integrate with `RoyalForm` seamlessly.
- [x] Verify form submission for rejected event ID: `44da822e-7ec6-4e82-b530-a2ef06759f24`.

---

**State**: paused
**Task**: Debug Stripe Webhook & Finalize Package System
**Issue**: #none
- [x] Schema Refactor (Product-Price Separation)
- [x] API Implementation (Eligibility & Checkout)
- [x] Frontend UI Update
- [ ] **BUG**: Webhook not updating transactions/stars
- [ ] **GIT**: Branch `feat/package-promotion-system` NOT committed/merged yet.
- [x] Design robust schema for Package and Price separation.
- [x] Define eligibility logic for "First-time Special" offers.
- [x] Plan Stripe integration using Price IDs.
- [x] Create full implementation plan snapshot.
- [ ] Update `schema.prisma` and run migration.
- [ ] Implement `PromotionService`.
- [ ] Update Stripe Checkout API.

---

🔮 **Late Night Session - Package Design & Cost Analysis** (Completed)
- [x] Analyze token usage for Multi-Agent Workflow (Gatekeeper, Analyst, Mystic).
- [x] Calculate cost per question for Gemini 2.5 Flash (Paid Tier).
- [x] Compare with Gemini 2.0 Flash for future optimization.
- [x] Analyze market pricing and "Know-how Value" strategy.
- [x] Design 3 pricing packages with "First-time Special" (50% Discount).
- [x] Create snapshot log and update focus.
- [x] Human confirmed the value-based pricing strategy.

---

🔮 **Late Night Session - Neon Database Branching Strategy** (Completed)
- [x] Analyze current Neon Database setup in `mmv-tarots`.
- [x] Design a branching strategy: Local/Staging -> Neon `staging`, Production -> Neon `main`.
- [x] Prepare step-by-step instructions for Neon and Vercel configuration.
- [x] Update `schema.prisma` to support `directUrl` for connection pooling.
- [x] Verify the workflow with a test migration. (Human confirmed config)
- [x] Session Retrospective completed.

---

🔮 **Night Session - Suggested Questions Navigation & UI Refinement** (Completed)
- [x] Make "Next Questions" in `/history/:id` clickable.
- [x] Pass the selected question to the home page (`/`) via query parameters.
- [x] Auto-populate the `QuestionInput` on the home page when a question is passed.
- [x] Swap Avatar Animation visibility (Show on Focus).
- [x] Implement Hero Title & Avatar Focus Interaction (Mimi is listening).
- [x] Verify the flow and user experience (Build passed).
- [x] Commit to `feat/suggested-questions-nav`.
- [x] Create PR #38 (Staging -> Main).
- [x] Session Retrospective completed.

---

🔮 **Evening Session - Error Handling Investigation & Implementation** (Completed)
- [x] Investigate error handling for tarot predictions in `mmv-tarots`.
- [x] Analyze error message standards and accuracy.
- [x] Implement detailed error logging in Database (Prisma).
- [x] Update Service Layer and API to expose error reasons.
- [x] Verify build and merge to `staging`.

---

🔮 **Afternoon Session - Workflow Engineering & AI Alignment** (Completed)
- [x] Analyze and refine Git workflow (Staging-based Feature Branches).
- [x] Update `.claude/commands/impl.md` with the new 4-phase protocol.
- [x] Update `.github/copilot-instructions.md` to enforce the new Git rules.
- [x] Create a snapshot of the new implementation plan.
- [x] Verify the workflow by creating a test branch in `mmv-tarots`. (Ready for next session)
- [x] Refine Gatekeeper prompt to distinguish between income/work and gambling.
- [x] Update `/impl` protocol to be context-aware (Multi-Project Git Isolation).


