# Soulcraft Live Dashboard — Design

## Summary

A Next.js app inside the soulcraft repo that serves a live, read-only dashboard.
It watches `shared/` for file changes and pushes updates to the browser via WebSocket.
The UI evolves from `templates/seon-dashboard.jsx` — same SEON dark theme, agent face
SVGs, kanban board, and message feed.

## Architecture

```
Browser (React)  <── WebSocket ──>  Next.js API Route
                                        |
                                   chokidar watches:
                                   ├── shared/TASK_BOARD.md
                                   ├── shared/DECISIONS.md
                                   ├── shared/discussions/*
                                   └── .git/  (for commit activity)
```

## Components (from existing template)

- **Top bar**: SEON logo, time, active agent count
- **Agent dock**: 12 face SVGs with live status indicators
- **Kanban board**: 4 columns parsed from TASK_BOARD.md
- **Task cards**: Priority badge, title, agent face, project tag
- **Message feed**: Recent git commits + discussion activity
- **Agent detail panel**: Click avatar to see tasks and activity

## Data Flow

1. Server: `chokidar` watches `shared/` and `.git/` for changes
2. On change: re-parses markdown files into JSON, diffs against cached state
3. Push: sends delta via WebSocket to all connected browsers
4. Client: React state updates, UI re-renders
5. Initial load: full state sent on WebSocket connect

## File Structure

```
dashboard/
├── package.json
├── next.config.js
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Main dashboard
│   ├── api/
│   │   └── ws/route.ts       # WebSocket endpoint
│   └── components/
│       ├── Face.tsx           # Agent SVG faces
│       ├── TaskCard.tsx
│       ├── KanbanBoard.tsx
│       ├── AgentDock.tsx
│       ├── AgentDetail.tsx
│       └── MessageFeed.tsx
├── lib/
│   ├── parser.ts             # Markdown -> JSON parsers
│   ├── watcher.ts            # chokidar file watcher
│   └── agents.ts             # Agent data (colors, roles, models)
```

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS (#110f0b bg, #E8845C accent, monospace)
- chokidar for file watching
- ws or socket.io for WebSocket
- No database — all state from markdown files

## Interaction

- Read-only for v1. Agents modify shared/ through Claude Code.
- Dashboard reflects changes in real time.

## Launch

```bash
cd dashboard && npm run dev
# Opens localhost:3000
```

## Decisions

- Local dev server, not deployed (zero cost, instant updates)
- File watcher + WebSocket (instant, no polling overhead)
- Read-only (avoids write conflicts with agents)
