"use client";

import { useState, useCallback } from "react";
import { AGENTS } from "@/lib/agents";
import type { AgentStatusValue } from "@/lib/types";
import { Face } from "./Face";

interface AgentDockProps {
  statuses: Record<string, AgentStatusValue>;
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export function AgentDock({ statuses, selected, onSelect }: AgentDockProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const getSize = useCallback(
    (idx: number) => {
      if (hoverIdx === null) return 32;
      const dist = Math.abs(idx - hoverIdx);
      if (dist === 0) return 52;
      if (dist === 1) return 42;
      if (dist === 2) return 36;
      return 32;
    },
    [hoverIdx],
  );

  return (
    <div className="flex justify-center gap-0.5 px-3 py-1.5 border-b border-seon-dock-border bg-seon-dock">
      {AGENTS.map((a, idx) => {
        const size = getSize(idx);
        return (
          <div
            key={a.id}
            onClick={() => onSelect(selected === a.id ? null : a.id)}
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}
            className="flex flex-col items-center gap-0.5 px-[7px] py-[3px] cursor-pointer rounded-sm"
            style={{
              borderBottom: selected === a.id ? `2px solid ${a.accent}` : "2px solid transparent",
              transition: "all 180ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div style={{ transition: "all 180ms cubic-bezier(0.22, 1, 0.36, 1)", height: size, width: size }}>
              <Face id={a.id} size={size} color={a.accent} active={statuses[a.id] === "active"} />
            </div>
            <span
              className="text-[8px] tracking-wider uppercase"
              style={{
                color:
                  statuses[a.id] === "active"
                    ? a.accent
                    : selected === a.id
                      ? "#c0bbb4"
                      : "#5a5550",
              }}
            >
              {a.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
