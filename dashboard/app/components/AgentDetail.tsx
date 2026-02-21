"use client";

import type { Agent, AgentStatusValue, Task, GitCommit } from "@/lib/types";
import { Face } from "./Face";
import { PBadge, StatusBtn } from "./StatusBadge";

interface AgentDetailProps {
  agent: Agent;
  status: AgentStatusValue;
  tasks: Task[];
  commits: GitCommit[];
  onClose: () => void;
}

export function AgentDetail({ agent, status, tasks, commits, onClose }: AgentDetailProps) {
  const agentTasks = tasks.filter((t) => t.agent === agent.id);
  const agentCommits = commits.filter((c) =>
    c.subject.toLowerCase().includes(agent.id) ||
    c.author.toLowerCase().includes(agent.id),
  );

  return (
    <div className="w-[280px] bg-[#16140f] border-l border-seon-border p-4 overflow-auto shrink-0">
      <div className="flex items-center gap-1 mb-4">
        <button
          onClick={onClose}
          className="bg-transparent border-none text-seon-dim cursor-pointer text-sm font-mono px-1.5 py-0.5"
        >
          &larr;
        </button>
        <span className="flex-1" />
      </div>

      <div className="text-center mb-4">
        <Face id={agent.id} size={56} color={agent.accent} active={status !== "offline"} />
        <div className="text-base font-bold text-seon-text mt-2">{agent.name}</div>
        <div className="text-[11px] text-seon-muted">{agent.role}</div>
        <div className="mt-1.5">
          <StatusBtn status={status} />
        </div>
      </div>

      <div className="bg-seon-card rounded-md px-2.5 py-2 mb-4">
        <div className="text-[9px] text-seon-dim tracking-widest uppercase mb-1">Invoke</div>
        <code className="text-[11px] break-all" style={{ color: agent.accent }}>
          Use the {agent.id} agent to...
        </code>
      </div>

      <div className="mb-4">
        <div className="text-[9px] text-seon-dim tracking-widest uppercase mb-2">
          Tasks ({agentTasks.length})
        </div>
        {agentTasks.length === 0 ? (
          <div className="text-[11px] text-seon-ghost italic">No tasks assigned</div>
        ) : (
          agentTasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-1.5 py-1.5 border-b border-seon-border"
            >
              <PBadge p={t.priority} />
              <span className="text-[11px] text-[#c0bbb4] flex-1">{t.title}</span>
              <span className="text-[9px] text-seon-faint">
                {t.status.replace("_", " ")}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="mb-4">
        <div className="text-[9px] text-seon-dim tracking-widest uppercase mb-2">
          Commits ({agentCommits.length})
        </div>
        {agentCommits.length === 0 ? (
          <div className="text-[11px] text-seon-ghost italic">No recent commits</div>
        ) : (
          agentCommits.slice(0, 5).map((c) => (
            <div key={c.hash} className="py-1.5 border-b border-seon-border">
              <div className="flex gap-1.5 items-center mb-0.5">
                <span className="text-[9px] text-seon-faint font-mono">{c.hash}</span>
              </div>
              <div className="text-[11px] text-[#a09a94]">{c.subject}</div>
            </div>
          ))
        )}
      </div>

      <div className="px-2.5 py-2 bg-seon-card rounded-md">
        <div className="text-[9px] text-seon-dim tracking-widest mb-1">MODEL</div>
        <span className="text-[11px] text-seon-muted">{agent.model}</span>
        <span className="text-[9px] text-seon-faint ml-2">&middot; {agent.tier}</span>
      </div>
    </div>
  );
}
