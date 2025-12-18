# /rrr - Session Retrospective

Create a session retrospective capturing what happened.

## Usage

```
rrr              # Create retrospective for current session
```

## Output Location

`psi/memory/retrospectives/YYYY-MM/DD/HH.MM_[slug].md`

## Required Sections

1. **Session Info** - Date, duration, focus
2. **What Happened** - Actual events (not plans)
3. **Key Decisions** - What was decided and why
4. **AI Diary** - Genuine reflection
5. **Honest Feedback** - Real challenges
6. **Next Actions** - What's next

## Process (AI-Driven)

1. **Gather Context Automatically**:
   - Use `get_changed_files` to see what was edited.
   - Use `run_in_terminal` with `git log --oneline -10` to see recent commits.
   - Read `psi/inbox/focus.md` to understand the session goal.
   - Review the current chat history for key decisions and friction points.

2. **Draft Retrospective**:
   - Use `templates/retrospective.md` as the base.
   - Fill in all sections based on gathered context.
   - **AI Diary**: Write a genuine, vulnerable reflection on the session.
   - **GitHub Integration**: If an Issue is linked in `focus.md`, include a section on whether to close it and draft the closing comment.

3. **Create Directory & Save**:
   - Determine path: `psi/memory/retrospectives/YYYY-MM/DD/HH.MM_[slug].md`
   - Create necessary directories.
   - Save the file and present it to the human for final approval.

## Quality Standards

- **AI Diary**: Minimum 150 words, must be vulnerable
- **Honest Feedback**: Must include friction points
- **No placeholders**: Fill all blanks before saving

## Template

See `templates/retrospective.md` for full template.
