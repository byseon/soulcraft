import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   SEON CONTROL — Native Claude Code Dashboard
   Notion-style minimal line faces · Warm dark theme
   Subagents + Skills + Commands + Agent Teams
   ═══════════════════════════════════════════════════════════════ */

const AGENTS = [
  { id: "hal", name: "HAL", role: "PM / Orchestrator", tier: "lead", accent: "#E8845C", model: "opus" },
  { id: "koah", name: "Koah", role: "Backend Engineer", tier: "core", accent: "#5CB8B2", model: "sonnet" },
  { id: "dia", name: "Dia", role: "Frontend Engineer", tier: "core", accent: "#D4A843", model: "sonnet" },
  { id: "yua", name: "Yua", role: "UI/UX Designer", tier: "support", accent: "#A78BDB", model: "sonnet" },
  { id: "luna", name: "Luna", role: "Marketing Lead", tier: "support", accent: "#D87A93", model: "sonnet" },
  { id: "sia", name: "Sia", role: "Data Analyst", tier: "support", accent: "#5BA3C9", model: "sonnet" },
  { id: "steve", name: "Steve", role: "CTO / Architect", tier: "support", accent: "#7EAA63", model: "opus" },
  { id: "bezos", name: "Bezos", role: "DevOps / Ops", tier: "support", accent: "#CC7B52", model: "sonnet" },
  { id: "boa", name: "Boa", role: "Security Auditor", tier: "audit", accent: "#C74B4B", model: "sonnet" },
  { id: "tea", name: "Tea", role: "QA / Testing", tier: "audit", accent: "#4B9E8E", model: "sonnet" },
  { id: "doa", name: "Doa", role: "Technical Writer", tier: "support", accent: "#BFA84E", model: "sonnet" },
  { id: "neo", name: "Neo", role: "ML Researcher", tier: "support", accent: "#8254A8", model: "opus" },
];

// ─── Notion-Style Minimal Face ───
// Clean circle + dot eyes + tiny mouth + ONE micro-feature per agent
function Face({ id, size = 36, color = "#888", active = false }) {
  const s = size;
  const cx = s / 2, cy = s / 2, r = s * 0.38;
  const eyeY = cy - r * 0.06;
  const sp = r * 0.3; // eye spread
  const er = s * 0.035; // eye radius
  const lc = active ? color : "#6b6560"; // line color
  const bg = active ? color + "14" : "transparent";

  // One distinguishing micro-feature per agent
  const feat = {
    hal: <line x1={cx-r*0.65} y1={cy-r*0.5} x2={cx+r*0.65} y2={cy-r*0.5} stroke={lc} strokeWidth={1.1} strokeLinecap="round" />,
    koah: <path d={`M${cx-r*0.6},${cy-r*0.55} Q${cx},${cy-r*1.3} ${cx+r*0.6},${cy-r*0.55}`} fill="none" stroke={lc} strokeWidth={1.1} />,
    dia: <polygon points={`${cx},${cy-r-3.5} ${cx+2},${cy-r-0.5} ${cx+4},${cy-r-0.5} ${cx+2.5},${cy-r+1.5} ${cx+3.2},${cy-r+3.5} ${cx},${cy-r+2} ${cx-3.2},${cy-r+3.5} ${cx-2.5},${cy-r+1.5} ${cx-4},${cy-r-0.5} ${cx-2},${cy-r-0.5}`} fill={lc} opacity={0.7} />,
    yua: <ellipse cx={cx-r*0.35} cy={cy-r*0.7} rx={r*0.5} ry={r*0.22} fill="none" stroke={lc} strokeWidth={1} />,
    luna: <path d={`M${cx+r*0.45},${cy-r*0.25} Q${cx+r*0.85},${cy+r*0.1} ${cx+r*0.55},${cy+r*0.55} Q${cx+r*0.95},${cy+r*0.75} ${cx+r*0.65},${cy+r*0.95}`} fill="none" stroke={lc} strokeWidth={1} strokeLinecap="round" />,
    sia: <><circle cx={cx-sp} cy={eyeY} r={r*0.2} fill="none" stroke={lc} strokeWidth={0.8}/><circle cx={cx+sp} cy={eyeY} r={r*0.2} fill="none" stroke={lc} strokeWidth={0.8}/><line x1={cx-sp+r*0.2} y1={eyeY} x2={cx+sp-r*0.2} y2={eyeY} stroke={lc} strokeWidth={0.7}/></>,
    steve: <>{[-1.2,-0.4,0.4,1.2].map(i=><line key={i} x1={cx+i*r*0.25} y1={cy-r*0.82} x2={cx+i*r*0.2} y2={cy-r-3-Math.abs(i)*0.8} stroke={lc} strokeWidth={0.9} strokeLinecap="round"/>)}</>,
    bezos: <path d={`M${cx-r*0.3},${cy+r*0.72} L${cx},${cy+r*0.95} L${cx+r*0.3},${cy+r*0.72}`} fill="none" stroke={lc} strokeWidth={0.9} strokeLinecap="round" />,
    boa: <line x1={cx-r*0.55} y1={eyeY} x2={cx+r*0.55} y2={eyeY} stroke={lc} strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />,
    tea: <><circle cx={cx+r*0.7} cy={cy+r*0.25} r={r*0.18} fill="none" stroke={lc} strokeWidth={0.9}/><line x1={cx+r*0.83} y1={cy+r*0.38} x2={cx+r*0.98} y2={cy+r*0.53} stroke={lc} strokeWidth={0.9} strokeLinecap="round"/></>,
    doa: <line x1={cx+r*0.5} y1={cy-r*0.4} x2={cx+r*0.7} y2={cy-r*0.85} stroke={lc} strokeWidth={1.1} strokeLinecap="round" />,
    neo: <>{[-2,-1,0,1,2].map(i=><line key={i} x1={cx+i*r*0.18} y1={cy-r*0.78} x2={cx+i*r*0.22+(i%2)*1.2} y2={cy-r-2-Math.abs(i)*1.3} stroke={lc} strokeWidth={0.8} strokeLinecap="round"/>)}<circle cx={cx-sp} cy={eyeY} r={r*0.18} fill="none" stroke={lc} strokeWidth={0.7}/><circle cx={cx+sp} cy={eyeY} r={r*0.18} fill="none" stroke={lc} strokeWidth={0.7}/></>,
  };

  const hasCustomEyes = ["sia", "neo", "boa"].includes(id);

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cy} r={r+3} fill={bg} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={lc} strokeWidth={1.2} />
      {!hasCustomEyes && <>
        <circle cx={cx-sp} cy={eyeY} r={er} fill={lc} />
        <circle cx={cx+sp} cy={eyeY} r={er} fill={lc} />
      </>}
      {hasCustomEyes && id !== "boa" && <>
        <circle cx={cx-sp} cy={eyeY} r={er*0.7} fill={lc} />
        <circle cx={cx+sp} cy={eyeY} r={er*0.7} fill={lc} />
      </>}
      <path d={`M${cx-r*0.1},${cy+r*0.28} Q${cx},${cy+r*0.36} ${cx+r*0.1},${cy+r*0.28}`} fill="none" stroke={lc} strokeWidth={0.7} strokeLinecap="round" />
      {feat[id]}
    </svg>
  );
}

// ─── Data ───
const INIT_TASKS = [
  { id: "t1", title: "Scoring API v2", agent: "koah", project: "talk45-pro", status: "in_progress", priority: "P0" },
  { id: "t2", title: "Landing page redesign", agent: "dia", project: "talk45-pro", status: "in_progress", priority: "P1" },
  { id: "t3", title: "Phoneme alignment benchmark", agent: "neo", project: "voxalign", status: "backlog", priority: "P1" },
  { id: "t4", title: "Security audit — auth flow", agent: "boa", project: "talk45-pro", status: "backlog", priority: "P2" },
  { id: "t5", title: "Test suite for scoring", agent: "tea", project: "talk45-pro", status: "backlog", priority: "P1" },
  { id: "t6", title: "Blog post: Talk45 launch", agent: "luna", project: "byseon.com", status: "backlog", priority: "P2" },
  { id: "t7", title: "Docker compose for deploy", agent: "bezos", project: "talk45-pro", status: "done", priority: "P1" },
  { id: "t8", title: "API documentation", agent: "doa", project: "talk45-pro", status: "review", priority: "P2" },
  { id: "t9", title: "Design system tokens", agent: "yua", project: "talk45-pro", status: "backlog", priority: "P2" },
  { id: "t10", title: "Analytics pipeline", agent: "sia", project: "talk45-pro", status: "backlog", priority: "P2" },
  { id: "t11", title: "Architecture review", agent: "steve", project: "talk45-pro", status: "backlog", priority: "P1" },
];

const INIT_MSGS = [
  { t: "14:32", from: "koah", to: "dia", text: "API schema ready. 4 endpoints: /assess, /score, /feedback, /history.", type: "direct" },
  { t: "14:15", from: "dia", to: "koah", text: "Need the response shape for the results component.", type: "direct" },
  { t: "13:48", from: "hal", to: "team", text: "Today's focus: Talk45 scoring + landing page.", type: "broadcast" },
  { t: "13:30", from: "bezos", to: "hal", text: "Docker compose merged. Staging is green.", type: "status" },
  { t: "12:05", from: "neo", to: "sia", text: "Pull benchmark data for xlsr-53 vs parakeet-ctc? Need 6-lang comparison.", type: "direct" },
  { t: "11:40", from: "doa", to: "hal", text: "API docs first draft done. Moved to Review.", type: "status" },
];

const INIT_STATUS = { hal: "idle", koah: "active", dia: "active", yua: "offline", luna: "offline", sia: "offline", steve: "offline", bezos: "idle", boa: "offline", tea: "offline", doa: "idle", neo: "offline" };

// ─── Small Components ───
function Dot({ color }) { return <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />; }
function PBadge({ p }) {
  const c = { P0: "#C74B4B", P1: "#D4A843", P2: "#5BA3C9", P3: "#6b6560" };
  return <span style={{ fontSize: 9, color: c[p], border: `1px solid ${c[p]}40`, padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>{p}</span>;
}

function StatusBtn({ status, accent, onClick }) {
  const m = { active: ["#2d4a3e", "#5CB8B2"], idle: ["#3d3520", "#D4A843"], offline: ["#252220", "#6b6560"] };
  const [bg, fg] = m[status] || m.offline;
  return <button onClick={onClick} style={{ background: bg, color: fg, border: "none", borderRadius: 10, padding: "2px 10px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{status}</button>;
}

// ─── Task Card ───
function TaskCard({ task }) {
  const ag = AGENTS.find(a => a.id === task.agent);
  return (
    <div draggable onDragStart={e => e.dataTransfer.setData("text/plain", task.id)}
      style={{ background: "#1e1c19", borderRadius: 6, padding: "10px 12px", cursor: "grab", borderLeft: `2px solid ${ag?.accent || "#555"}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <PBadge p={task.priority} />
        <span style={{ fontSize: 12, color: "#e0dbd4", fontWeight: 500, flex: 1 }}>{task.title}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Face id={ag?.id} size={16} color={ag?.accent} active />
          <span style={{ fontSize: 10, color: ag?.accent }}>{ag?.name}</span>
        </div>
        <span style={{ fontSize: 9, color: "#5a5550" }}>{task.project}</span>
      </div>
    </div>
  );
}

// ─── Column ───
function Col({ title, id: colId, tasks, onDrop, color }) {
  return (
    <div onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); onDrop(e.dataTransfer.getData("text/plain"), colId); }}
      style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Dot color={color} />
        <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 0.8, textTransform: "uppercase" }}>{title}</span>
        <span style={{ fontSize: 10, color: "#5a5550", marginLeft: "auto" }}>{tasks.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, overflow: "auto" }}>
        {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      </div>
    </div>
  );
}

// ─── Agent Detail Panel ───
function Detail({ agent, status, tasks, msgs, onClose, onToggle }) {
  if (!agent) return null;
  const at = tasks.filter(t => t.agent === agent.id);
  const am = msgs.filter(m => m.from === agent.id || m.to === agent.id);
  return (
    <div style={{ width: 280, background: "#16140f", borderLeft: "1px solid #2a2520", padding: 16, overflow: "auto", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b6560", cursor: "pointer", fontSize: 14, fontFamily: "inherit", padding: "2px 6px" }}>←</button>
        <span style={{ flex: 1 }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <Face id={agent.id} size={56} color={agent.accent} active={status !== "offline"} />
        <div style={{ fontSize: 16, fontWeight: 700, color: "#e0dbd4", marginTop: 8 }}>{agent.name}</div>
        <div style={{ fontSize: 11, color: "#8a8580" }}>{agent.role}</div>
        <div style={{ marginTop: 6 }}><StatusBtn status={status} accent={agent.accent} onClick={onToggle} /></div>
      </div>

      <div style={{ background: "#1e1c19", borderRadius: 6, padding: "8px 10px", marginBottom: 16 }}>
        <div style={{ fontSize: 9, color: "#6b6560", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Invoke</div>
        <code style={{ fontSize: 11, color: agent.accent, wordBreak: "break-all" }}>Use the {agent.id} agent to...</code>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 9, color: "#6b6560", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Tasks ({at.length})</div>
        {at.length === 0 ? <div style={{ fontSize: 11, color: "#4a4540", fontStyle: "italic" }}>No tasks assigned</div> :
          at.map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", borderBottom: "1px solid #2a2520" }}>
              <PBadge p={t.priority} />
              <span style={{ fontSize: 11, color: "#c0bbb4", flex: 1 }}>{t.title}</span>
              <span style={{ fontSize: 9, color: "#5a5550" }}>{t.status.replace("_"," ")}</span>
            </div>
          ))}
      </div>

      <div>
        <div style={{ fontSize: 9, color: "#6b6560", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Messages</div>
        {am.length === 0 ? <div style={{ fontSize: 11, color: "#4a4540", fontStyle: "italic" }}>No messages</div> :
          am.slice(0, 4).map((m, i) => {
            const other = AGENTS.find(a => a.id === (m.from === agent.id ? m.to : m.from));
            return (
              <div key={i} style={{ padding: "5px 0", borderBottom: "1px solid #2a2520" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
                  <span style={{ fontSize: 9, color: "#5a5550" }}>{m.t}</span>
                  <span style={{ fontSize: 10, color: m.from === agent.id ? agent.accent : other?.accent }}>
                    {m.from === agent.id ? `→ @${m.to}` : `← @${m.from}`}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#a09a94" }}>{m.text}</div>
              </div>
            );
          })}
      </div>

      <div style={{ marginTop: 16, padding: "8px 10px", background: "#1e1c19", borderRadius: 6 }}>
        <div style={{ fontSize: 9, color: "#6b6560", letterSpacing: 1, marginBottom: 4 }}>MODEL</div>
        <span style={{ fontSize: 11, color: "#8a8580" }}>{agent.model}</span>
        <span style={{ fontSize: 9, color: "#5a5550", marginLeft: 8 }}>· {agent.tier}</span>
      </div>
    </div>
  );
}

// ─── Main ───
export default function SEONDashboard() {
  const [view, setView] = useState("overview");
  const [sel, setSel] = useState(null);
  const [tasks, setTasks] = useState(INIT_TASKS);
  const [msgs] = useState(INIT_MSGS);
  const [statuses, setStatuses] = useState(INIT_STATUS);
  const [time, setTime] = useState(new Date());

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(t); }, []);

  const handleDrop = useCallback((tid, newSt) => { setTasks(p => p.map(t => t.id === tid ? { ...t, status: newSt } : t)); }, []);
  const toggleStatus = useCallback((id) => { setStatuses(p => ({ ...p, [id]: p[id] === "offline" ? "idle" : p[id] === "idle" ? "active" : "offline" })); }, []);

  const cols = [
    { id: "backlog", title: "Backlog", color: "#6b6560" },
    { id: "in_progress", title: "In Progress", color: "#D4A843" },
    { id: "review", title: "Review", color: "#A78BDB" },
    { id: "done", title: "Done", color: "#5CB8B2" },
  ];

  const activeN = Object.values(statuses).filter(s => s === "active").length;
  const selAgent = sel ? AGENTS.find(a => a.id === sel) : null;

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", background: "#110f0b", color: "#e0dbd4", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ─ Top Bar ─ */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px 20px", borderBottom: "1px solid #2a2520", background: "#110f0b", position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#E8845C", letterSpacing: 3 }}>SEON</span>
        <span style={{ fontSize: 10, color: "#6b6560", marginLeft: 6, letterSpacing: 1 }}>control</span>
        <div style={{ display: "flex", gap: 2, marginLeft: 32 }}>
          {["overview", "board", "messages"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              background: "none", border: "none", padding: "6px 14px", fontSize: 11, cursor: "pointer",
              fontFamily: "inherit", color: view === v ? "#e0dbd4" : "#6b6560",
              borderBottom: view === v ? "1.5px solid #E8845C" : "1.5px solid transparent",
            }}>{v}</button>
          ))}
        </div>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#5a5550" }}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <span style={{ marginLeft: 16, fontSize: 10, color: "#5CB8B2" }}>{activeN} active</span>
      </div>

      {/* ─ Agent Dock ─ */}
      <div style={{ display: "flex", justifyContent: "center", gap: 1, padding: "6px 12px", borderBottom: "1px solid #1e1c17", background: "#0e0d09" }}>
        {AGENTS.map(a => (
          <div key={a.id} onClick={() => setSel(sel === a.id ? null : a.id)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, padding: "3px 7px", cursor: "pointer",
              borderBottom: sel === a.id ? `2px solid ${a.accent}` : "2px solid transparent", borderRadius: 2 }}>
            <Face id={a.id} size={32} color={a.accent} active={statuses[a.id] === "active"} />
            <span style={{ fontSize: 8, letterSpacing: 0.5, textTransform: "uppercase",
              color: statuses[a.id] === "active" ? a.accent : sel === a.id ? "#c0bbb4" : "#5a5550" }}>{a.name}</span>
          </div>
        ))}
      </div>

      {/* ─ Main ─ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>

          {/* Overview */}
          {view === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {[
                  { v: tasks.filter(t => t.status === "in_progress").length, l: "In Progress", c: "#D4A843" },
                  { v: tasks.filter(t => t.status === "review").length, l: "Review", c: "#A78BDB" },
                  { v: tasks.filter(t => t.status === "done").length, l: "Done", c: "#5CB8B2" },
                  { v: activeN, l: "Active Agents", c: "#E8845C" },
                ].map(({ v, l, c }) => (
                  <div key={l} style={{ background: "#1a1815", border: "1px solid #2a2520", borderRadius: 8, padding: "14px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: c }}>{v}</div>
                    <div style={{ fontSize: 10, color: "#6b6560", marginTop: 3, letterSpacing: 0.4 }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Agent Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
                {AGENTS.map(a => {
                  const st = statuses[a.id];
                  return (
                    <div key={a.id} onClick={() => toggleStatus(a.id)}
                      style={{ background: "#1a1815", border: `1px solid ${st === "active" ? a.accent + "40" : "#2a2520"}`,
                        borderRadius: 8, padding: 12, cursor: "pointer", opacity: st === "offline" ? 0.45 : 1, transition: "all 0.2s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Face id={a.id} size={30} color={a.accent} active={st === "active"} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#e0dbd4" }}>{a.name}</div>
                          <div style={{ fontSize: 10, color: "#8a8580" }}>{a.role}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                        <StatusBtn status={st} accent={a.accent} onClick={e => { e.stopPropagation(); toggleStatus(a.id); }} />
                        <span style={{ fontSize: 9, color: "#5a5550" }}>{a.model}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Messages */}
              <div style={{ background: "#1a1815", border: "1px solid #2a2520", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#6b6560", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Recent Messages</div>
                {msgs.slice(0, 4).map((m, i) => {
                  const fa = AGENTS.find(a => a.id === m.from);
                  const ta = m.to === "team" ? null : AGENTS.find(a => a.id === m.to);
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0", borderBottom: i < 3 ? "1px solid #2220" : "none" }}>
                      <Face id={fa?.id} size={20} color={fa?.accent} active />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: fa?.accent }}>{fa?.name}</span>
                          <span style={{ fontSize: 9, color: "#5a5550" }}>→ {m.to === "team" ? "team" : ta?.name}</span>
                          <span style={{ fontSize: 9, color: "#4a4540", marginLeft: "auto" }}>{m.t}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#a09a94", marginTop: 2 }}>{m.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Board */}
          {view === "board" && (
            <div style={{ display: "flex", gap: 12, height: "calc(100vh - 130px)" }}>
              {cols.map(col => (
                <Col key={col.id} {...col} tasks={tasks.filter(t => t.status === col.id)} onDrop={handleDrop} />
              ))}
            </div>
          )}

          {/* Messages */}
          {view === "messages" && (
            <div style={{ maxWidth: 640 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#6b6560", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Agent Messages</div>
              {msgs.map((m, i) => {
                const fa = AGENTS.find(a => a.id === m.from);
                const ta = m.to === "team" ? null : AGENTS.find(a => a.id === m.to);
                const icon = { direct: "→", broadcast: "◆", status: "↑" };
                return (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #1e1c17" }}>
                    <Face id={fa?.id} size={28} color={fa?.accent} active />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: fa?.accent }}>{fa?.name}</span>
                        <span style={{ fontSize: 10, color: "#5a5550" }}>{icon[m.type]} {m.to === "team" ? "team" : ta?.name}</span>
                        <span style={{ fontSize: 9, color: "#4a4540", marginLeft: "auto" }}>{m.t}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#c0bbb4", marginTop: 3 }}>{m.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail Sidebar */}
        {selAgent && (
          <Detail agent={selAgent} status={statuses[sel]} tasks={tasks} msgs={msgs}
            onClose={() => setSel(null)} onToggle={() => toggleStatus(sel)} />
        )}
      </div>
    </div>
  );
}
