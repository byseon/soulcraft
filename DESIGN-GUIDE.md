# SEON Agent Character Design Guide

## Design Philosophy

Line-art characters inspired by the Callva aesthetic — minimal strokes on
colored backgrounds. Each character must be instantly recognizable at 40px
(dock thumbnail) and still charming at 120px (detail view).

**Key principle**: Silhouette-first. If you squint and can't tell them apart,
the design fails. Every agent needs a unique silhouette created by one
dominant visual feature.

## Color System

Each agent gets a **background color** (muted, dark-toned) and an **accent
color** (vibrant, used for name labels and UI highlights). Lines are drawn in
either cream `#e8d5b8` (for hair/accessories) or near-black `#1a1a2e` (for
facial features).

| Agent | BG Color | Accent | Hex Pair |
|-------|----------|--------|----------|
| HAL | Deep purple | Violet | `#4a3a6e` / `#a78bfa` |
| Koah | Navy | Blue | `#2a3a5e` / `#60a5fa` |
| Dia | Plum | Pink | `#5a2a4e` / `#f472b6` |
| Yua | Brown | Orange | `#4e3a2a` / `#fb923c` |
| Luna | Teal | Emerald | `#1a4a3e` / `#34d399` |
| Sia | Indigo | Periwinkle | `#2e2e5e` / `#818cf8` |
| Steve | Olive | Gold | `#4e4a1a` / `#fbbf24` |
| Bezos | Maroon | Red | `#4e1a1a` / `#f87171` |
| Boa | Dark teal | Cyan | `#1a3e3e` / `#2dd4bf` |
| Tea | Forest | Lime | `#2e3e1a` / `#a3e635` |
| Doa | Rosewood | Salmon | `#3e2a2a` / `#fca5a5` |
| Neo | Grape | Lavender | `#3a2a5e` / `#c084fc` |

## Character Designs — Distinguishing Features

### HAL — PM / Orchestrator 🧠
- **Silhouette feature**: Headband (thin horizontal band across forehead)
- **Expression**: Calm, slight smile — the composed leader
- **Eyes**: Small dots, evenly spaced
- **Vibe**: Military commander meets meditation teacher
- **Why headband**: Suggests focus, discipline, always "on"

### Koah — Backend Engineer ⚙️
- **Silhouette feature**: Beanie hat (rounded cap sitting high)
- **Expression**: Focused, neutral mouth — the quiet coder
- **Eyes**: Horizontal line-eyes (concentrating)
- **Vibe**: Hoodie-wearing backend dev at 2am
- **Why beanie**: Cozy, heads-down, stereotypical dev energy
- **Extra**: Small pom-pom on top of beanie

### Dia — Frontend Engineer 🎨
- **Silhouette feature**: Long flowing hair with a sparkle/star
- **Expression**: Open smile — the creative energy
- **Eyes**: Large round eyes (curious, aesthetic-minded)
- **Vibe**: Designer who codes, or coder who designs
- **Why hair+star**: Creativity, flair, visual expression
- **Extra**: Small golden star ✦ floating near the hair

### Yua — UI/UX Designer ✏️
- **Silhouette feature**: Beret (French artist hat, tilted)
- **Expression**: Slight "O" mouth — perpetually observing
- **Eyes**: Soft dots
- **Vibe**: Art school graduate with strong opinions about whitespace
- **Why beret**: Instantly reads as "artist/designer"
- **Extra**: Pencil or brush floating beside them (colored orange)

### Luna — Marketing Lead 📢
- **Silhouette feature**: Wavy bob haircut (bouncy, energetic)
- **Expression**: Big open smile (mouth visible) — extrovert energy
- **Eyes**: Bright dots with raised brows
- **Vibe**: Startup marketer who runs on caffeine and conversion rates
- **Why bob**: Dynamic, approachable, always presenting
- **Extra**: Hair has slight wave/curl pattern

### Sia — Data Analyst 📊
- **Silhouette feature**: Round glasses (thick frames, visible bridge)
- **Expression**: Neutral, analytical — the poker face
- **Eyes**: Visible through glasses, small dots
- **Vibe**: The quiet one who drops the most insightful observation
- **Why glasses**: Instantly reads as "data/analytical person"
- **Extra**: Straight bangs across forehead

### Steve — CTO / Tech Lead 🏗️
- **Silhouette feature**: Spiky short hair (5 upward spikes)
- **Expression**: Slight frown — the critical reviewer
- **Eyes**: Dots with angled brows (skeptical/evaluating)
- **Vibe**: Senior engineer who's seen every anti-pattern
- **Why spiky**: Sharp, decisive, energetic but controlled
- **Extra**: No accessories — the hair IS the statement

### Bezos — COO / Ops 📋
- **Silhouette feature**: Side-parted neat hair + collar hint
- **Expression**: Professional smile — composed
- **Eyes**: Standard dots
- **Vibe**: The person who makes the trains run on time
- **Why neat hair+collar**: Corporate, operational, structured
- **Extra**: V-shaped collar at bottom suggesting suit/shirt

### Boa — Security Engineer 🛡️
- **Silhouette feature**: Visor/eye shield (horizontal bar across eyes)
- **Expression**: Flat mouth — vigilant, unreadable
- **Eyes**: Hidden behind visor with small green scan lines
- **Vibe**: Cybersecurity analyst monitoring threat dashboards
- **Why visor**: Suggests scanning, protecting, seeing what others miss
- **Extra**: Visor has 3 small vertical lines (scan effect)

### Tea — QA / Testing 🧪
- **Silhouette feature**: Magnifying glass (held near face)
- **Expression**: Slight smile with big curious eyes
- **Eyes**: Large with highlight dots (searching for bugs)
- **Vibe**: The detective who finds the one edge case you missed
- **Why magnifying glass**: Perfect metaphor for QA work
- **Extra**: Soft curved hair on top

### Doa — Docs / Planning 📝
- **Silhouette feature**: Pen tucked behind ear
- **Expression**: Gentle smile — the thoughtful writer
- **Eyes**: Soft small dots
- **Vibe**: Technical writer who turns chaos into clarity
- **Why pen behind ear**: Universal sign of "writer ready to work"
- **Extra**: Pen has a colored tip (red dot at top)

### Neo — ML Researcher 🔬
- **Silhouette feature**: Wild Einstein hair + round glasses
- **Expression**: Thoughtful, thin straight mouth
- **Eyes**: Small dots visible through glasses
- **Vibe**: The researcher who forgets to eat because the experiment
  is running
- **Why wild hair+glasses**: Classic scientist archetype
- **Extra**: Hair goes in 3 different wild directions

## Animation Notes (for Dashboard)

### Dock Behavior (macOS-style magnification)
- Base size: 40px
- Hover: 78px (target agent)
- Neighbor ±1: 56px
- Neighbor ±2: 46px
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — fast in, smooth out
- Transition: 180ms

### Status Indicator
- Small dot in bottom-right corner of avatar
- Colors: green (working), yellow (standby), orange (resting), gray (offline)
- Pulsing animation for "working" status: subtle scale 1.0→1.3→1.0 every 2s

### Hover Tooltip
- Appears above avatar on hover: Name, Role, Status
- Fade+slide in: opacity 0→1, translateY(5px→0)
- Duration: 150ms

### Click → Detail Panel
- Slides in from right (240px width)
- Shows full agent info, model, team, tools
- "Open Terminal →" button to jump to terminal view

## Production Notes

For final implementation, these SVG avatars should be:
1. Exported as standalone SVG files (one per agent)
2. Viewbox: `0 0 120 120` for high-res rendering
3. All strokes should use `stroke-linecap: round`
4. Background circle should have subtle stroke (`#e8d5b8` at 1.5px)
5. Consider adding very subtle noise/grain texture to backgrounds
   for depth (CSS filter or SVG turbulence)

For higher-fidelity versions (marketing, website), commission an
illustrator to draw these in a consistent hand-drawn style — the SVGs
serve as the spec/blueprint. Alternatively, generate via AI image tools
using these descriptions as prompts, then trace to clean vector.
