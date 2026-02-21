---
name: standup
description: Generate daily standup report from git activity and task board. Triggers on "standup", "daily update", "morning report", "what happened yesterday".
---
Generate a daily standup report by:

1. Read shared/TASK_BOARD.md for current task statuses
2. Run `git log --oneline --since="yesterday" --all` for recent commits
3. Check shared/discussions/ for any active discussions
4. Summarize per-agent:
   - What was done (from git log + task moves)
   - What's planned (from task board assignments)
   - Any blockers (from task board notes)

Format as:
```
# Standup — {date}

## Completed
- @koah: {what they did}
- @dia: {what they did}

## In Progress
- @koah: {current task}
- @dia: {current task}

## Blockers
- {any blockers noted}

## Active Discussions
- {topic}: {participants}, {status}
```
