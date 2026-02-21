---
name: task-management
description: Manage the team task board. Use when assigning, updating, or reviewing tasks. Triggers on "assign", "prioritize", "plan sprint", "what's the status", "task board".
---
## Task Board Format

The task board lives at `shared/TASK_BOARD.md` using this format:

```markdown
# TASK BOARD
> Last updated: YYYY-MM-DD HH:MM
> Updated by: @agent-name

## Backlog
- [ ] `T{NNN}` {title} @{agent} #{project} {P0|P1|P2|P3}

## In Progress
- [ ] `T{NNN}` {title} @{agent} #{project} {P0|P1|P2|P3}

## Review
- [ ] `T{NNN}` {title} @{agent} #{project} {P0|P1|P2|P3}

## Done
- [x] `T{NNN}` {title} @{agent} #{project} {P0|P1|P2|P3}
```

## Rules
1. Read the full board before making changes
2. Increment task ID from the highest existing
3. Update "Last updated" and "Updated by" on every change
4. Move tasks between columns by cut-paste
5. Only HAL assigns tasks to other agents
6. Any agent can move their OWN tasks between columns
7. Priority: P0 (critical) > P1 (high) > P2 (medium) > P3 (low)
