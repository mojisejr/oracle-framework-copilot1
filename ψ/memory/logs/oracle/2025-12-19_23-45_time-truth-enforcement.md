---
project: oracle
issue: #none
tags: []
date: 2025-12-19
agent: oracle-keeper
---

# Log: Time Truth & Local Time Enforcement

**Date**: 2025-12-19 23:45 (Local Time)
**Issue**: #none
**Status**: completed

## Context
Identified inconsistency in timekeeping between different models (Free vs Top Tier). Some models use UTC or internal clocks, leading to drift in logs and focus updates.

## Actions
- Ran `date` to sync with the human's local time (Fri Dec 19 23:43:26 +07 2025).
- Updated `.github/agents/oracle-keeper.agent.md` to include **"Time Truth"** in the Tier Optimization Protocol.
- Updated `.github/copilot-instructions.md` to explicitly state **"Time is Local"** as a core philosophy.
- Mandated the use of `run_in_terminal` with `date` before any logging or focus updates.

## Decisions
- Local time of the human's machine is now the "Single Source of Truth" for all timestamps.
- This prevents confusion when multiple agents or models work on the same project across different timezones or internal settings.

## Next Steps
- All future logs must follow this local time standard.
