# Architecture Decision Records
> Append-only. HAL records final decisions after discussion.

---

### ADR-001: Native Claude Code Architecture
- **Date**: 2026-02-19
- **Decided by**: Jin + HAL
- **Decision**: Use Claude Code subagents + skills + commands instead of external orchestration
- **Rationale**: Everything runs natively. Subagents for agents, skills for procedures, commands for shortcuts, Agent Teams for sprints. Max 20x covers usage.
- **Tradeoff**: No multi-model routing. All agents use Claude models. Jin manually orchestrates.
