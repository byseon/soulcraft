---
name: discuss
description: Start a structured multi-agent discussion thread on a technical topic. Usage: /soulcraft:discuss "{topic}" {agent1} {agent2} ...
---
Create a discussion: $ARGUMENTS

Parse arguments:
- Quoted string: discussion topic
- Remaining words: participating agent names (2-4 recommended)

Steps:
1. Generate slug from topic (lowercase, hyphens, no special chars)
2. Create file: shared/discussions/{YYYY-MM-DD}-{slug}.md
3. Write the discussion template:

```markdown
# Discussion: {Topic}
> Created: {date} by user
> Participants: @{agent1} @{agent2} ...
> Status: OPEN

## Context
{Brief context — ask user if not obvious from topic}

## Positions

(Agents will add their positions below)
```

4. Invoke the first listed agent to write their position
5. Tell the user how to continue:
   - "Use the {agent2} agent to add their position to the discussion on {topic}"
   - Or: invoke agents sequentially so each reads previous positions

6. When all agents have contributed, ask if HAL should close with a decision

Example:
- /soulcraft:discuss "phoneme alignment: CTC vs attention" neo sia
- /soulcraft:discuss "monolith vs microservices for Talk45" steve koah bezos
