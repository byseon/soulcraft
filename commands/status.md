---
name: status
description: Quick inline status showing all agent states, active tasks, and recent activity. Usage: /soulcraft:status
---
Generate a concise inline status report:

1. Read shared/TASK_BOARD.md — count tasks per column
2. Check recent git log (last 24h)
3. Check shared/discussions/ for OPEN threads

Format as a compact terminal-friendly summary:

```
SOULCRAFT — {N} tasks · {date}

IN PROGRESS
  ● {Agent}  {task title}  [{priority}]
  ● {Agent}  {task title}  [{priority}]

REVIEW
  ◐ {Agent}  {task title}  [{priority}]

BACKLOG ({N} tasks)
  Top: {highest priority task} @{agent}

RECENT (24h)
  {latest git commit summary}
  {latest discussion/decision if any}
```

Rules:
- Show all In Progress and Review tasks with full detail
- For Backlog, just show count + top priority item
- Skip Done tasks
- Keep it under 20 lines total
- Use ● for active, ◐ for review, ○ for backlog
