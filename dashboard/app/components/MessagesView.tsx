"use client";

import type { GitCommit, Discussion } from "@/lib/types";
import { AGENTS } from "@/lib/agents";
import { Face } from "./Face";

interface MessagesViewProps {
  commits: GitCommit[];
  discussions: Discussion[];
}

export function MessagesView({ commits, discussions }: MessagesViewProps) {
  return (
    <div className="max-w-[640px]">
      {/* Discussions */}
      {discussions.length > 0 && (
        <div className="mb-6">
          <div className="text-[10px] font-bold text-seon-dim tracking-widest uppercase mb-3">
            Discussions
          </div>
          {discussions.map((d) => {
            const creator = AGENTS.find((a) => a.id === d.createdBy);
            return (
              <div
                key={d.filename}
                className="flex gap-2.5 py-2.5 border-b border-seon-dock-border"
              >
                <Face id={creator?.id ?? ""} size={28} color={creator?.accent} active />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: creator?.accent }}>
                      {creator?.name ?? d.createdBy}
                    </span>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded"
                      style={{
                        background: d.status === "OPEN" ? "#D4A84320" : "#5CB8B220",
                        color: d.status === "OPEN" ? "#D4A843" : "#5CB8B2",
                      }}
                    >
                      {d.status}
                    </span>
                    <span className="text-[9px] text-seon-ghost ml-auto">{d.createdDate}</span>
                  </div>
                  <div className="text-xs text-[#c0bbb4] mt-1">{d.topic}</div>
                  <div className="text-[10px] text-seon-faint mt-0.5">
                    {d.positionCount} position{d.positionCount !== 1 ? "s" : ""} &middot;{" "}
                    {d.participants.map((p) => `@${p}`).join(" ")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Git Commits */}
      <div>
        <div className="text-[10px] font-bold text-seon-dim tracking-widest uppercase mb-3">
          Git Activity
        </div>
        {commits.map((c) => {
          const agent = AGENTS.find(
            (a) =>
              c.subject.toLowerCase().includes(a.id) ||
              c.author.toLowerCase().includes(a.id),
          );
          return (
            <div key={c.hash} className="flex gap-2.5 py-2.5 border-b border-seon-dock-border">
              <Face
                id={agent?.id ?? "hal"}
                size={28}
                color={agent?.accent ?? "#6b6560"}
                active={!!agent}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: agent?.accent ?? "#8a8580" }}>
                    {agent?.name ?? c.author}
                  </span>
                  <span className="text-[9px] text-seon-faint font-mono">{c.hash}</span>
                  <span className="text-[9px] text-seon-ghost ml-auto">
                    {c.date.slice(0, 10)}
                  </span>
                </div>
                <div className="text-xs text-[#c0bbb4] mt-1">{c.subject}</div>
                {c.refs && (
                  <span className="text-[9px] text-seon-faint">{c.refs}</span>
                )}
              </div>
            </div>
          );
        })}
        {commits.length === 0 && (
          <div className="text-[11px] text-seon-ghost italic">No recent activity</div>
        )}
      </div>
    </div>
  );
}
