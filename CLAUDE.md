# Oracle Framework - AI Assistant Instructions

> **Modular Documentation**: This is the hub. Details in linked files.

## Navigation

| File | Content |
|------|---------|
| [.claude/knowledge/oracle-philosophy.md](.claude/knowledge/oracle-philosophy.md) | Core philosophy |
| [.claude/knowledge/writing-style.md](.claude/knowledge/writing-style.md) | Communication style |

## Golden Rules

1. **NEVER force push** - History is sacred
2. **NEVER push to main** - Use feature branch + PR
3. **NEVER merge PRs** - Wait for human approval
4. **NEVER delete without asking** - Nothing is deleted
5. **Always confirm** - AI suggests, human decides

## Oracle Philosophy

> "The Oracle Keeps the Human Human"

Core principles:
1. **Nothing is Deleted** - Append only, timestamps = truth
2. **Patterns Over Intentions** - Observe behavior, not promises
3. **External Brain, Not Command** - Mirror reality, don't decide

See `.claude/knowledge/oracle-philosophy.md` for full details.

## psi/ Structure (5 Pillars)

```
psi/
├── active/     <- "What am I researching?" (gitignored)
├── inbox/      <- "Who am I talking to?"
├── memory/     <- "What do I remember?"
├── writing/    <- "What am I writing?"
└── lab/        <- "What am I experimenting with?"
```

## Session Workflow

1. **Start**: Update `psi/inbox/focus.md` with current task
2. **Work**: Append to logs as needed
3. **End**: Create retrospective with `/rrr`
4. **Later**: Distill patterns to learnings

## Commands

- `/oracle` - Check mission alignment
- `/rrr` - Create retrospective
- `/snapshot` - Quick capture

## Human Confirmation Loop

Before every permanent action:
```
**Before we proceed:**
- Is this okay?
- Missing anything?

Ready to commit or edit first?
```
