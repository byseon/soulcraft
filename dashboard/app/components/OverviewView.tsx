"use client";

import type { Task, AgentStatusValue, GitCommit } from "@/lib/types";
import { AGENTS } from "@/lib/agents";
import { Face } from "./Face";
import { StatusBtn } from "./StatusBadge";

interface OverviewViewProps {
  tasks: Task[];
  statuses: Record<string, AgentStatusValue>;
  commits: GitCommit[];
  onAgentClick: (id: string) => void;
}

export function OverviewView({ tasks, statuses, commits, onAgentClick }: OverviewViewProps) {
  const activeCount = Object.values(statuses).filter((s) => s === "active").length;

  const stats = [
    { v: tasks.filter((t) => t.status === "in_progress").length, l: "In Progress", c: "#D4A843" },
    { v: tasks.filter((t) => t.status === "review").length, l: "Review", c: "#A78BDB" },
    { v: tasks.filter((t) => t.status === "done").length, l: "Done", c: "#5CB8B2" },
    { v: activeCount, l: "Active Agents", c: "#E8845C" },
  ];

  return (
    <div className="flex flex-col gap-4 max-w-[900px]">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        {stats.map(({ v, l, c }) => (
          <div
            key={l}
            className="bg-seon-surface border border-seon-border rounded-lg px-3 py-3.5 text-center"
          >
            <div className="text-[26px] font-bold" style={{ color: c }}>{v}</div>
            <div className="text-[10px] text-seon-dim mt-1 tracking-wider">{l}</div>
          </div>
        ))}
      </div>

      {/* Agent Grid */}
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
        {AGENTS.map((a) => {
          const st = statuses[a.id] ?? "offline";
          return (
            <div
              key={a.id}
              onClick={() => onAgentClick(a.id)}
              className="bg-seon-surface rounded-lg p-3 cursor-pointer transition-all duration-200"
              style={{
                border: `1px solid ${st === "active" ? a.accent + "40" : "#2a2520"}`,
                opacity: st === "offline" ? 0.45 : 1,
              }}
            >
              <div className="flex items-center gap-2">
                <Face id={a.id} size={30} color={a.accent} active={st === "active"} />
                <div>
                  <div className="text-xs font-semibold text-seon-text">{a.name}</div>
                  <div className="text-[10px] text-seon-muted">{a.role}</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <StatusBtn status={st} onClick={(e) => e.stopPropagation()} />
                <span className="text-[9px] text-seon-faint">{a.model}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-seon-surface border border-seon-border rounded-lg p-3.5">
        <div className="text-[10px] font-bold text-seon-dim tracking-widest uppercase mb-2.5">
          Recent Commits
        </div>
        {commits.slice(0, 6).map((c, i) => (
          <div
            key={c.hash}
            className="flex items-start gap-2 py-1.5"
            style={{ borderBottom: i < 5 ? "1px solid #2a252020" : "none" }}
          >
            <span className="text-[9px] text-seon-faint font-mono shrink-0 mt-0.5">{c.hash}</span>
            <div className="flex-1">
              <div className="text-[11px] text-[#c0bbb4]">{c.subject}</div>
              <div className="text-[9px] text-seon-ghost mt-0.5">{c.author}</div>
            </div>
          </div>
        ))}
        {commits.length === 0 && (
          <div className="text-[11px] text-seon-ghost italic">No recent commits</div>
        )}
      </div>
    </div>
  );
}
