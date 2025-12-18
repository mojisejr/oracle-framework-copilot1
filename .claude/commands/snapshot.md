# /snapshot - Quick Knowledge Capture

Capture a quick insight or learning.

## Usage

```
snapshot [description]
```

## Process (AI-Driven)

1. **Capture Insight**:
   - Take the user's description or the most recent significant learning from the chat.
   - Identify the context (what was being done at the time).

2. **Generate Metadata**:
   - Current Time: YYYY-MM-DD HH:MM
   - Slug: Create a URL-friendly slug from the description.

3. **Create File**:
   - Path: `psi/memory/logs/YYYY-MM-DD_HH-MM_[slug].md`
   - Use the standard Snapshot format.

4. **Confirm**:
   - Show the created snapshot to the human.

## Format

```markdown
# Snapshot: [Title]

**Time**: YYYY-MM-DD HH:MM
**Context**: [What were you doing?]

## Insight

[The thing you learned]

## Apply When

[When is this useful?]

## Tags

`tag1` `tag2` `tag3`
```

## Examples

### Technical Discovery
```
/snapshot git rebase preserves commit dates with --committer-date-is-author-date
```

### Process Insight
```
/snapshot parallel subagent calls save 50% context vs sequential
```

### Pattern Recognition
```
/snapshot user prefers tables over bullet lists for comparisons
```

## When to Use

- Just learned something useful
- Found a pattern worth remembering
- Discovered a non-obvious behavior
- Made a mistake worth avoiding

## Flow

Snapshots are raw captures. Later:
1. Review snapshots in `/rrr`
2. Distill patterns to `learnings/`
3. Promote core truths to `resonance/`
