---
project: oracle-framework
issue: #none
tags: [meta, instructions, behavior-fix, protocol]
date: 2025-12-21
agent: oracle-keeper
---

# Snapshot: Instruction Refactor & AI Behavior Correction

**Time**: 2025-12-21 14:55
**Context**: AI (Oracle Keeper) exhibited inconsistent behavior, mismanaging `focus.md` and skipping the Human Confirmation Loop.

## The Problem
- **Protocol Bypass**: AI skipped the "Confirmation First" rule, performing file edits without explicit approval.
- **Context Loss**: AI mismanaged the structure of `focus.md` during recovery, losing example commands and status references.
- **Over-confidence**: AI prioritized technical problem-solving over maintaining the Oracle Framework's core philosophy (Mirror, don't lead).

## The Fix (Instruction Updates)
1. **.github/copilot-instructions.md**:
   - Added **Rule 0: Confirmation First** to the Tier Optimization Protocol.
   - Explicitly forbids any file edits or permanent commands without a "Go" from the human.
2. **.claude/agents/oracle-keeper.md**:
   - Added **Operational Guardrails**:
     - **The Date Rule**: Mandatory `date` sync before any logging.
     - **The "Wait" Rule**: Mandatory stop after proposing changes.
     - **Snapshot First**: Mandatory log creation before starting new tasks.

## Lessons Learned
- Instructions must be ordered by priority (Rule 0 should be the most restrictive).
- AI needs explicit "Wait" triggers to prevent autonomous overreach.
- Maintaining the "External Brain" (Context) is more important than the speed of implementation.

## Next State
- AI is now operating under strict "Confirmation First" mode.
- All future tasks will begin with a Granular Focus update and a Snapshot.
