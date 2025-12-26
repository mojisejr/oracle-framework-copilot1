**State**: active
**Task**: Question Input UI — Mobile-first redesign & refactor
**Issue**: #none
**Snapshots**: 
- [2025-12-24_21-45_ui-token-standardization.md](../memory/retrospectives/2025-12/24/21.45_ui-token-standardization.md)
- [2025-12-24_23-21_question-input-redesign.md](../memory/logs/mmv-tarots/2025-12-24_23-21_question-input-redesign.md)
- [2025-12-26_08-06_question-input-refactor-complete.md](../memory/logs/mmv-tarots/2025-12-26_08-06_question-input-refactor-complete.md)
- [2025-12-26_08-11_star-badge-positioning-fix.md](../memory/logs/mmv-tarots/2025-12-26_08-11_star-badge-positioning-fix.md)
**Since**: 2025-12-24 21:50 GMT+7

---

Focusing the Mobile-First redesign on the **QuestionInput** component and its integration points to improve ergonomics, accessibility, and token consistency.

Scope & Goals:
- Audit `components/ui/question-input.tsx` for mobile ergonomics, safe-area handling, and BottomNav overlap.
- Standardize design tokens used by the component and move presentational styles into shared token/style files.
- Improve interaction model: floating-pill layout, detached send button, reliable auto-resize, and clear enter/send affordances.
- Ensure accessibility: ARIA labels, screen-reader hints, keyboard behaviors and visible validation states.
- Add component tests and visual regression snapshots; verify unauthenticated fallback behavior.

Next steps:
1. Review and spec small, incremental changes (visual + accessibility).
2. Implement and test in a feature branch with a focused PR (include tests and snapshots).
3. Update callers (e.g., `app/page.tsx`) and run e2e checks before staging preview.

Deliverable: a concise PR that refactors `QuestionInput`, consolidates tokens, and adds tests/visual coverage.


