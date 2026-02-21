# Soulcraft

> 12 AI agents with souls. A Claude Code plugin for multi-agent development.

Soulcraft gives you a team of specialized AI subagents — each with their own
persona, role, tool permissions, and persistent memory — inside Claude Code.
Just describe what you need and Claude delegates to the right agent.

## Install

```bash
claude plugin add ./soulcraft
```

## Quick Start

```bash
cd ~/projects/my-app
claude

# Initialize the project
> /soulcraft:init

# Assign work
> /soulcraft:assign koah "build user authentication API"
> /soulcraft:assign dia "login page with OAuth buttons"

# Or just ask — Claude auto-delegates
> "Build a REST API for scoring"        → Koah handles it
> "Design the onboarding flow"          → Yua handles it
> "Is this auth implementation secure?" → Boa handles it

# Check status
> /soulcraft:status

# Open visual dashboard
> /soulcraft:board
```

## How It Works

You talk to Claude Code normally. Soulcraft registers 12 subagents
that Claude auto-delegates to based on your request. You can also
invoke agents explicitly or use slash commands.

**Three modes:**

| Mode | How | When |
|------|-----|------|
| Auto-delegate | Just describe the task | Default, most of the time |
| Explicit | "Use the koah agent to..." | When you want a specific agent |
| Agent Teams | `/soulcraft:sprint` | Coordinated parallel sprints |

Each agent runs in its own context window with a custom system prompt,
restricted tools, and persistent memory that survives across sessions.

## Agents

### Lead
| Agent | Role | Model |
|-------|------|-------|
| **HAL** | PM / Orchestrator | opus |

### Core
| Agent | Role | Model |
|-------|------|-------|
| **Koah** | Backend Engineer | sonnet |
| **Dia** | Frontend Engineer | sonnet |

### Support
| Agent | Role | Model |
|-------|------|-------|
| **Yua** | UI/UX Designer | sonnet |
| **Luna** | Marketing Lead | sonnet |
| **Sia** | Data Analyst | sonnet |
| **Steve** | CTO / Architect | opus |
| **Bezos** | DevOps / Ops | sonnet |
| **Doa** | Technical Writer | sonnet |
| **Neo** | ML Researcher | opus |

### Audit (Read Only)
| Agent | Role | Model |
|-------|------|-------|
| **Boa** | Security Auditor | sonnet |
| **Tea** | QA / Testing | sonnet |

### Auto-Delegation Examples

Claude reads each agent's description and routes automatically:

```
"Build the scoring API"                → Koah (backend)
"Create a hero section with animation" → Dia (frontend)
"Design the onboarding user flow"      → Yua (UI/UX)
"Write a blog post about our launch"   → Luna (marketing)
"Benchmark these two models"           → Sia (data) or Neo (ML)
"Should we use Postgres or MongoDB?"   → Steve (architecture)
"Set up the CI/CD pipeline"            → Bezos (DevOps)
"Audit this auth flow for vulns"       → Boa (security, READ ONLY)
"Write tests for the scoring module"   → Tea (QA)
"Update the API documentation"         → Doa (docs)
"Evaluate xlsr-53 vs parakeet-ctc"     → Neo (ML research)
"Plan this week's sprint"              → HAL (PM)
```

## Commands

All commands are namespaced `soulcraft:` to avoid collisions.

### `/soulcraft:init`

Initialize Soulcraft in the current project. Creates the shared state directory.

```
> /soulcraft:init

Soulcraft initialized ✓
  shared/TASK_BOARD.md  — Task board (empty)
  shared/DECISIONS.md   — Decision log
  shared/discussions/   — Discussion threads
```

### `/soulcraft:assign {agent} "{task}" [priority]`

Assign a task to a specific agent and add it to the task board.

```
> /soulcraft:assign koah "scoring API v3"
> /soulcraft:assign dia "hero section animation" P1
> /soulcraft:assign boa "auth flow review" P0
```

Priority levels: P0 (critical) → P1 (high) → P2 (medium, default) → P3 (low)

### `/soulcraft:status`

Quick inline status — shows active tasks, agent states, recent activity.
Prints directly in the terminal, under 20 lines.

```
> /soulcraft:status

SOULCRAFT — 11 tasks · Feb 20

IN PROGRESS
  ● Koah  Scoring API v2          [P0]
  ● Dia   Landing page redesign   [P1]

REVIEW
  ◐ Doa   API documentation       [P2]

BACKLOG (7 tasks)
  Top: Architecture review @steve [P1]
```

### `/soulcraft:board`

Generate a full interactive HTML dashboard and open it in your browser.
Includes kanban board, agent avatars, activity feed, and drag-drop task management.

```
> /soulcraft:board
→ Opens browser with visual dashboard
```

### `/soulcraft:standup`

Generate a daily standup report from git activity and the task board.

```
> /soulcraft:standup

# Standup — Feb 20

## Done (last 24h)
- @bezos: Docker compose merged (T007)

## In Progress
- @koah: Scoring API v2 [P0]
- @dia: Landing page redesign [P1]

## Backlog Top
- Architecture review @steve [P1]
```

### `/soulcraft:sprint {name} {agent1} {agent2} ...`

Start a coordinated Agent Teams sprint. HAL acts as team lead,
named agents work in parallel with real-time messaging.

```
> /soulcraft:sprint talk45-launch koah dia tea
→ HAL leads, Koah + Dia + Tea work in parallel
→ Agents message each other directly
→ HAL synthesizes results when done
```

**Note**: Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.
Burns tokens ~5x faster. Use for big coordinated pushes.

### `/soulcraft:discuss "{topic}" {agent1} {agent2} ...`

Start a structured discussion thread between agents on a technical topic.

```
> /soulcraft:discuss "monolith vs microservices" steve koah bezos
→ Creates shared/discussions/2026-02-20-monolith-vs-microservices.md
→ Each agent adds their position with evidence
→ HAL closes with a final decision
```

### `/soulcraft:review {branch-or-path}`

Run a combined security + QA review by invoking Boa and Tea.

```
> /soulcraft:review koah/scoring-v2
→ Boa scans for vulnerabilities (READ ONLY)
→ Tea checks test coverage and quality
→ Combined report with severity ratings
```

## Skills

Skills are auto-discovered procedural knowledge that any agent can use.
You don't invoke them directly — agents load them when relevant.

| Skill | Loaded When | What It Provides |
|-------|------------|-----------------|
| task-management | Agent reads/writes task board | TASK_BOARD.md format rules |
| discussion | Creating/managing discussions | Discussion thread template |
| security-audit | Running security reviews | Systematic checklist |
| code-review | Reviewing code or PRs | Quality review process |
| standup | Generating standups | Report format + data gathering |

## Shared State

Agents coordinate through files in `shared/` at the project root:

```
shared/
├── TASK_BOARD.md       # Kanban: Backlog → In Progress → Review → Done
├── DECISIONS.md        # Architecture decision records (append-only)
└── discussions/        # Per-topic discussion threads
    └── 2026-02-20-alignment-approach.md
```

### Task Board Format

```markdown
## In Progress
- [ ] `T001` Scoring API v2 @koah #talk45-pro P0
```

Each task has: ID, title, assigned agent, project tag, priority.

## Memory

Each agent has persistent memory that survives across sessions.
Over time they build up project-specific knowledge:

- **Koah** remembers codebase patterns, API conventions, past bugs
- **Tea** remembers test strategies, flaky tests, coverage gaps
- **Neo** accumulates research findings, benchmark results
- **HAL** tracks project history, decision patterns

Memory scope is set to `user` (per-user, across projects).

## Agent Teams (Escalation)

For coordinated sprints where agents need real-time communication:

```
/soulcraft:sprint talk45-launch koah dia tea
```

This uses Claude Code's experimental Agent Teams feature:
- HAL becomes team lead, spawns named agents as teammates
- Each teammate gets their own context window
- Agents communicate via built-in inbox messaging
- Shared task list with file locking

**When to use**: Big pushes needing 2-4 agents working on the same
codebase simultaneously. Not for everyday work.

**Cost**: Each teammate burns tokens independently. A 3-agent sprint
might use 160 messages (~HAL 20 + Koah 80 + Dia 60) in one session.

## Security Model

Enforced via the `tools` field in each agent's frontmatter:

| Agent | Can Write Code | Can Execute | Notes |
|-------|---------------|------------|-------|
| Koah, Dia, Bezos | ✅ | ✅ | Full dev access |
| Tea | tests/ only | ✅ | Test environment |
| Steve | ❌ | Read only | Advisory only |
| Boa | ❌ | Read only | **READ ONLY** — never modifies code |
| Others | Own domain | Limited | Scoped to role |

## Plugin Structure

```
soulcraft/
├── plugin.json                 # Plugin manifest
├── CLAUDE.md                   # Base context all agents inherit
├── DESIGN-GUIDE.md             # Visual specs for dashboard
├── agents/                     # 12 subagent definitions
│   ├── hal.md                  #   PM / Orchestrator
│   ├── koah.md                 #   Backend Engineer
│   ├── dia.md                  #   Frontend Engineer
│   ├── yua.md                  #   UI/UX Designer
│   ├── luna.md                 #   Marketing Lead
│   ├── sia.md                  #   Data Analyst
│   ├── steve.md                #   CTO / Architect
│   ├── bezos.md                #   DevOps / Ops
│   ├── boa.md                  #   Security Auditor
│   ├── tea.md                  #   QA / Testing
│   ├── doa.md                  #   Technical Writer
│   └── neo.md                  #   ML Researcher
├── skills/                     # Shared procedural skills
│   ├── task-management/SKILL.md
│   ├── discussion/SKILL.md
│   ├── security-audit/SKILL.md
│   ├── code-review/SKILL.md
│   └── standup/SKILL.md
├── commands/                   # Slash commands → /soulcraft:*
│   ├── init.md
│   ├── assign.md
│   ├── status.md
│   ├── board.md
│   ├── standup.md
│   ├── sprint.md
│   ├── discuss.md
│   └── review.md
└── shared/                     # Template shared state
    ├── TASK_BOARD.md
    ├── DECISIONS.md
    └── discussions/
```

## Requirements

- Claude Code with Max 20x subscription
- Agent Teams requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

## License

MIT
