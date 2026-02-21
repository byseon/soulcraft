---
name: standup
description: Generate a daily standup report from git activity and the task board. Usage: /soulcraft:standup
---
Generate today's standup by scanning the project:

1. Read shared/TASK_BOARD.md — list all tasks by status
2. Run `git log --oneline --since="24 hours ago" --all` for recent commits
3. Check shared/discussions/ for any OPEN discussion threads
4. Read shared/DECISIONS.md for any recent decisions

Format the report as:

```
# Standup — {today's date}

## Done (last 24h)
- @{agent}: {what they completed} (from git commits + Done tasks)

## In Progress
- @{agent}: {task title} [{priority}]

## Blocked
- {any tasks with noted blockers}

## Active Discussions
- {topic} — {participants} — {status}

## Recent Decisions
- {any decisions made since last standup}
```

Keep it concise. One line per item. Skip sections with nothing to report.
