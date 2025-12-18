# Current Focus

**State**: in-progress
**Task**: Always respond in Thai
**Issue**: #2
**Since**: 17:00

## States

| State | When |
|-------|------|
| `working` | Actively doing task |
| `focusing` | Deep work, don't interrupt |
| `pending` | Waiting for input/decision |
| `jumped` | Changed topic |
| `completed` | Finished task |
| `idle` | No active task |

## How to Update

```bash
echo "STATE: working
TASK: [what you're doing]
SINCE: $(date '+%H:%M')" > psi/inbox/focus.md
```
