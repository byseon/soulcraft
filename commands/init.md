---
name: init
description: Initialize Soulcraft in the current project. Creates shared/ directory with task board and decisions log. Usage: /soulcraft:init
---
Initialize Soulcraft for this project: $ARGUMENTS

Steps:
1. Check if shared/ directory already exists
   - If yes: "Soulcraft already initialized. Use /soulcraft:status to see current state."
   - If no: continue

2. Create directory structure:
   ```
   shared/
   ├── TASK_BOARD.md
   ├── DECISIONS.md
   └── discussions/
   ```

3. Write initial TASK_BOARD.md:
   ```markdown
   # TASK BOARD
   > Last updated: {now}
   > Updated by: @hal

   ## Backlog

   ## In Progress

   ## Review

   ## Done
   ```

4. Write initial DECISIONS.md:
   ```markdown
   # Architecture Decision Records
   > Append-only. HAL records final decisions after discussion.
   ```

5. Create empty shared/discussions/ directory

6. Confirm:
   ```
   Soulcraft initialized ✓
   
   shared/TASK_BOARD.md  — Task board (empty)
   shared/DECISIONS.md   — Decision log
   shared/discussions/   — Discussion threads
   
   Next steps:
     /soulcraft:assign {agent} "{first task}"
     /soulcraft:status
   ```
