---
name: assign
description: Assign a task to an agent with an isolated git worktree. Usage: /soulcraft:assign {agent} "{task title}" [P0|P1|P2|P3]
---
Assign a task from: $ARGUMENTS

Parse arguments:
- First word: agent name (hal, koah, dia, yua, luna, sia, steve, bezos, boa, tea, doa, neo)
- Quoted string: task title
- Optional priority: P0 (critical), P1 (high), P2 (medium, default), P3 (low)

Steps:
1. Read shared/TASK_BOARD.md
2. Find the highest task ID (T###), increment by 1
3. Generate a slug from the task title (lowercase, hyphens, no special chars, max 30 chars)
4. Add new task to Backlog: `- [ ] \`T{new_id}\` {title} @{agent} #{current_project} {priority}`
5. Update "Last updated" timestamp and "Updated by: @hal"

6. Create an isolated git worktree for the agent:
   ```bash
   git worktree add .worktrees/{task_id}-{slug} -b agent/{agent}/{task_id}-{slug}
   ```
   - If `.worktrees/` directory doesn't exist, create it
   - Branch name format: `agent/{agent_id}/{task_id}-{slug}` (e.g., `agent/koah/t012-scoring-api-v3`)
   - Worktree path: `.worktrees/{task_id}-{slug}` (e.g., `.worktrees/t012-scoring-api-v3`)

7. Add worktree entry to shared/MERGE_REQUESTS.md:
   ```markdown
   ### MR-{task_id}: {title}
   - **Agent**: @{agent}
   - **Branch**: agent/{agent}/{task_id}-{slug}
   - **Worktree**: .worktrees/{task_id}-{slug}
   - **Status**: IN_PROGRESS
   - **Created**: {date}
   - **Files changed**: (pending)
   - **Summary**: (pending)
   ```

8. Confirm the assignment:
   ```
   Task {task_id} assigned to @{agent}

   Worktree: .worktrees/{task_id}-{slug}
   Branch:   agent/{agent}/{task_id}-{slug}

   The agent will work in an isolated worktree.
   When done, they'll submit a merge request for review.
   ```

9. Ask if they want to invoke the agent to start working on it now
   - If yes, tell the agent: "Work in directory .worktrees/{task_id}-{slug}. When finished, use the merge-request skill to submit your work."

Examples:
- /soulcraft:assign koah "scoring API v3"
- /soulcraft:assign dia "hero section animation" P1
- /soulcraft:assign boa "auth flow review" P0
