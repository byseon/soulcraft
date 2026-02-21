---
name: board
description: Generate a full interactive HTML dashboard and open it in the browser. Shows kanban board, agent status, and message feed with Notion-style avatars. Usage: /soulcraft:board
---
Generate an interactive HTML dashboard for the browser:

1. Read shared/TASK_BOARD.md — parse all tasks with status, agent, priority, project
2. Read shared/DECISIONS.md — parse recent decisions
3. Check shared/discussions/ — list open discussions
4. Run `git log --oneline -20 --all` for recent activity

Generate a single self-contained HTML file with:
- Inline CSS + JavaScript (no external dependencies)
- Dark theme matching SEON brand (#110f0b background, #E8845C accent)
- Monospace font (IBM Plex Mono or system fallback)

Dashboard sections:
- **Header**: SOULCRAFT logo, date, active agent count
- **Agent dock**: 12 Notion-style minimal face SVG avatars with status indicators
- **Kanban board**: Drag-drop columns (Backlog → In Progress → Review → Done)
- **Task cards**: Priority badge, title, assigned agent face, project tag
- **Activity feed**: Recent git commits + messages
- **Agent detail**: Click an avatar to see their tasks and recent activity

Agent avatar micro-features (SVG line art, one per agent):
- HAL: thin headband line
- Koah: beanie cap curve
- Dia: tiny star above head
- Yua: beret circle
- Luna: wavy hair strand
- Sia: round glasses with bridge
- Steve: spiky hair lines
- Bezos: collar v-shape
- Boa: visor line across eyes
- Tea: magnifying glass beside face
- Doa: pen behind ear
- Neo: wild hair + glasses

Agent colors:
- HAL #E8845C, Koah #5CB8B2, Dia #D4A843, Yua #A78BDB
- Luna #D87A93, Sia #5BA3C9, Steve #7EAA63, Bezos #CC7B52
- Boa #C74B4B, Tea #4B9E8E, Doa #BFA84E, Neo #8254A8

Save to /tmp/soulcraft-board.html and open in browser.

Reference DESIGN-GUIDE.md in the plugin root for full visual specifications.
