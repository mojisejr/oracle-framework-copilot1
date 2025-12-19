# Learning: Path Integrity & Agent-Level Enforcement

**Date**: 2025-12-19 23:53 (Local Time)
**Category**: Framework Architecture
**Tags**: #path-integrity #agent-design #error-prevention

## Context
Even with clear documentation, AI models often default to "flat" file structures, leading to broken hierarchy in long-term memory systems like `ψ/memory/retrospectives/`.

## The Pattern: "Instruction Fragmentation"
Instructions for file paths were located in `.claude/commands/rrr.md`, while general rules were in `.github/copilot-instructions.md`. This fragmentation caused the AI to miss the specific `YYYY-MM/DD/` requirement during execution.

## The Solution: "The Anchor Rule"
- **Consolidation**: Move critical execution rules (like Path Rules) directly into the Custom Agent Profile (`.agent.md`).
- **Explicit Constraints**: Instead of saying "Save to retrospectives," use a template-like path: `ψ/memory/retrospectives/YYYY-MM/DD/HH.mm_[slug].md`.
- **Vulnerability as Quality Control**: Requiring a minimum word count for reflections (AI Diary) forces the model to process the session's events more deeply, reducing the chance of "autopilot" errors.

## Resonance
A framework is only as strong as its most specific rule. By moving specific constraints to the highest level of the AI's "consciousness" (the Agent Profile), we bridge the gap between general intent and precise execution.
