---
name: merge-request
description: Submit completed work from a worktree for review. Use when an agent finishes a task and wants HAL to review and merge. Triggers on "submit", "merge request", "ready for review", "done with task".
---
## Merge Request Protocol

When you've finished working on a task in your worktree, use this protocol to submit your work for review.

### Steps

1. **Ensure all work is committed** in your worktree:
   - `git add` all relevant files (never add secrets, .env, node_modules, etc.)
   - `git commit` with a conventional commit message: `feat:`, `fix:`, `refactor:`, etc.
   - Double check: `git status` should show a clean working tree

2. **Generate a summary of your changes**:
   - Run `git diff main...HEAD --stat` to get files changed
   - Run `git log main..HEAD --oneline` to get commit list
   - Write a brief summary of what was done and why

3. **Update shared/MERGE_REQUESTS.md**:
   - Find your task's MR entry (match by task ID or branch name)
   - Update the fields:
     ```markdown
     - **Status**: READY_FOR_REVIEW
     - **Files changed**: {list from git diff --stat}
     - **Summary**: {your summary}
     - **Commits**: {list from git log}
     - **Submitted**: {date}
     ```

4. **Update shared/TASK_BOARD.md**:
   - Move your task from "In Progress" to "Review"
   - Update the timestamp and "Updated by: @{your_id}"

5. **Notify HAL** (or the orchestrator):
   ```
   Merge request submitted for {task_id}: {title}
   Branch: agent/{your_id}/{task_id}-{slug}
   Ready for review.
   ```

### For the Reviewer (HAL)

When reviewing a merge request:

1. **Read the MR entry** in shared/MERGE_REQUESTS.md
2. **Review the diff**: `git diff main...agent/{agent}/{task_id}-{slug}`
3. **Check for**:
   - Code quality (follows project standards)
   - Tests included
   - No security issues
   - No conflicts with other active worktrees

4. **Approve**:
   - Merge the branch: `git merge agent/{agent}/{task_id}-{slug} --no-ff -m "Merge {task_id}: {title}"`
   - Remove the worktree: `git worktree remove .worktrees/{task_id}-{slug}`
   - Delete the branch: `git branch -d agent/{agent}/{task_id}-{slug}`
   - Update MR status to MERGED
   - Move task to "Done" in TASK_BOARD.md

5. **Reject**:
   - Update MR status to CHANGES_REQUESTED
   - Add feedback in the MR entry:
     ```markdown
     - **Feedback**: {what needs to change}
     ```
   - Notify the agent to continue working in their worktree

### MR Status Flow
```
IN_PROGRESS → READY_FOR_REVIEW → MERGED
                                → CHANGES_REQUESTED → READY_FOR_REVIEW → ...
```
