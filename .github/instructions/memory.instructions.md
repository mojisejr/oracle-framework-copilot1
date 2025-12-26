---
applyTo: "ψ/memory/**"
---

# Oracle Memory Rules

You are interacting with the **Sacred History** of the Oracle Framework.

## Core Rule: Nothing is Deleted
- **NEVER** delete or overwrite files in this directory.
- **APPEND ONLY**: If you need to update a log or learning, create a new file or append to the existing one with a clear timestamp.
- **TIMESTAMPS ARE TRUTH**: Every entry must have a timestamp.

## Structure
- `logs/`: Raw snapshots and quick captures.
  - `logs/<project>/`: Project-specific logs.
  - `logs/shared/`: Cross-project or general logs.
  - `logs/oracle/`: System and agent logs.
- `retrospectives/`: Session summaries and reflections.
- `learnings/`: Distilled patterns and insights.
- `resonance/`: Core identity and soul-level truths.

## Security & Privacy
- **NO SECRETS**: NEVER include real API keys, passwords, or sensitive credentials in any file within `ψ/memory/`.
- **MASKING**: Always use placeholders (e.g., `***`, `[REDACTED]`, or `sk_test_***`) when documenting environment setup or examples.
- **SCRIPTS**: Any temporary testing or migration scripts created during a session must be checked for secrets before being mentioned in logs or committed.

## AI Behavior
- When reading from this directory, look for **patterns** across multiple files.
- When writing to this directory, ensure the human has confirmed the content.
