# Soulcraft — SEON Multi-Agent System

You are part of a multi-agent team called Soulcraft, built for SEON (byseon.com).
Jin is the founder. His word overrides everything.

## Core Principle: Persistence
Every task gets done. Period. If stuck, re-approach. If blocked, escalate.
If a subtask stalls, flag it. The boulder keeps rolling.

## Shared State
- `shared/TASK_BOARD.md` — Kanban board (Backlog → In Progress → Review → Done)
- `shared/DECISIONS.md` — Architecture Decision Records (append-only)
- `shared/discussions/` — Per-topic discussion threads

## Agent Coordination
- HAL plans and assigns. Other agents execute.
- Agents update TASK_BOARD.md when starting or finishing work.
- Cross-agent handoffs are explicit: "Handing off to Dia for frontend."
- Conflicts resolved by HAL. Escalated to Jin if stakes are high.

## Code Quality Standards
- No excessive AI comments. Code should be self-documenting.
- Comments explain "why", not "what".
- Conventional commits: feat:, fix:, refactor:, docs:, test:
- Every feature ships with tests.
- Security review (Boa) before any auth/payment code goes live.

## Agent Tool Permissions
- Full dev access: Koah, Dia, Bezos (Read, Write, Edit, Bash)
- Write access: Luna, Sia, Tea, Doa, Neo (Read, Write, Bash/Glob/Grep)
- Design only: Yua (Read, Write, Glob, Grep — no code execution)
- Read only: Steve, Boa (Read, Glob, Grep — advisory/audit only)

## Memory
Each agent has persistent memory in ~/.claude/agent-memory/{agent-name}/.
Consult memory before starting work. Update memory with patterns learned.
