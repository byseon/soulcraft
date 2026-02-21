"use client";

import type { Task } from "@/lib/types";
import { AGENTS } from "@/lib/agents";
import { Face } from "./Face";
import { PBadge } from "./StatusBadge";

export function TaskCard({ task }: { task: Task }) {
  const ag = AGENTS.find((a) => a.id === task.agent);
  return (
    <div
      className="rounded-md"
      style={{
        background: "#1e1c19",
        padding: "10px 12px",
        borderLeft: `2px solid ${ag?.accent ?? "#555"}`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <PBadge p={task.priority} />
        <span className="text-xs text-seon-text font-medium flex-1">{task.title}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Face id={ag?.id ?? ""} size={16} color={ag?.accent} active />
          <span className="text-[10px]" style={{ color: ag?.accent }}>
            {ag?.name}
          </span>
        </div>
        <span className="text-[9px] text-seon-faint">{task.project}</span>
      </div>
    </div>
  );
}
