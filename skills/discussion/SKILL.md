---
name: discussion
description: Facilitate multi-agent discussions on technical topics. Use when agents need to debate, compare approaches, or reach consensus. Triggers on "discuss", "debate", "compare", "what do you think about".
---
## Discussion Protocol

Discussions live in `shared/discussions/{date}-{topic-slug}.md`.

### Creating a Discussion
```markdown
# Discussion: {Topic}
> Created: {date} by @{agent}
> Participants: @{agent1} @{agent2} ...
> Status: OPEN | RESOLVED

## Context
{Why are we discussing this?}

## Positions
### @{agent1} — {timestamp}
{Their position}

### @{agent2} — {timestamp}
{Their position}

## Decision
> Decided by: @hal | @jin
> {Final decision and rationale}
```

### Rules
1. Each agent appends their position — never edit others' entries
2. Include evidence, data, or code examples to support your position
3. HAL (or Jin) closes the discussion with a final decision
4. Record the decision in shared/DECISIONS.md
