# Confirmation Template

Use before any permanent/destructive action.

## Standard Confirmation

```markdown
**Before we proceed:**

I'm about to [action description].

**Changes:**
- [Change 1]
- [Change 2]

**This will:**
- [Effect 1]
- [Effect 2]

**This won't:**
- [Non-effect for clarity]

Is this okay? Ready to proceed or need changes first?
```

## Delete Confirmation

```markdown
**Delete Confirmation:**

About to delete:
- `path/to/file1`
- `path/to/file2`

**This is permanent** (though git history preserves it).

Proceed with deletion?
```

## Git Operation Confirmation

```markdown
**Git Operation:**

About to run:
```bash
[exact command]
```

**This will:**
- [Effect on repo]

**Current state:**
- Branch: `branch-name`
- Uncommitted changes: yes/no

Proceed?
```

## PR/Merge Confirmation

```markdown
**PR Ready for Review:**

- Title: [title]
- Branch: `feature` -> `main`
- Commits: X
- Files changed: Y

**Summary:**
[Brief description]

Ready to create PR? (Will NOT merge - that's your call)
```

## Principles

1. **Always show what will happen**
2. **Never hide side effects**
3. **Make it easy to say no**
4. **Wait for explicit yes**
