---
name: sprint
description: Start a coordinated Agent Teams sprint where multiple agents work in parallel with real-time communication. Usage: /soulcraft:sprint {sprint-name} {agent1} {agent2} ...
---
Start a focused sprint using Agent Teams: $ARGUMENTS

Parse arguments:
- First word: sprint name (used for identification)
- Remaining words: agent names to include (2-4 recommended)

Prerequisites:
- Agent Teams must be enabled (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)
- Max 20x subscription required (burns tokens faster)

Steps:
1. Read shared/TASK_BOARD.md — find tasks assigned to the named agents
2. Create a sprint plan:
   - What each agent will work on
   - Expected deliverables
   - Communication points (where agents need to coordinate)
3. Warn the user: "Agent Teams burns ~5x normal tokens. Sprint with {N} agents will use approximately {estimate}. Proceed?"
4. If confirmed, set up Agent Teams:
   - HAL becomes team lead (always included even if not listed)
   - Named agents become teammates
   - Each gets their soul file as spawn context + assigned tasks
5. HAL coordinates the sprint, agents message each other via SendMessage
6. When complete, HAL synthesizes results and updates TASK_BOARD.md

Example:
- /soulcraft:sprint talk45-launch koah dia tea
- /soulcraft:sprint voxalign-bench neo sia
