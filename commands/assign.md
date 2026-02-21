---
name: assign
description: Assign a task to an agent and optionally start them working on it. Usage: /soulcraft:assign {agent} "{task title}" [P0|P1|P2|P3]
---
Assign a task from: $ARGUMENTS

Parse arguments:
- First word: agent name (hal, koah, dia, yua, luna, sia, steve, bezos, boa, tea, doa, neo)
- Quoted string: task title
- Optional priority: P0 (critical), P1 (high), P2 (medium, default), P3 (low)

Steps:
1. Read shared/TASK_BOARD.md
2. Find the highest task ID (T###), increment by 1
3. Add new task to Backlog: `- [ ] \`T{new_id}\` {title} @{agent} #{current_project} {priority}`
4. Update "Last updated" timestamp and "Updated by: @hal"
5. Confirm the assignment to the user
6. Ask if they want to invoke the agent to start working on it now

Examples:
- /soulcraft:assign koah "scoring API v3"
- /soulcraft:assign dia "hero section animation" P1
- /soulcraft:assign boa "auth flow review" P0
