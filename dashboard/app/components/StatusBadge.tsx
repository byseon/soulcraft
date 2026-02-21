"use client";

import type { Priority, AgentStatusValue } from "@/lib/types";

const PRIORITY_COLORS: Record<Priority, string> = {
  P0: "#C74B4B",
  P1: "#D4A843",
  P2: "#5BA3C9",
  P3: "#6b6560",
};

export function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
      style={{ background: color }}
    />
  );
}

export function PBadge({ p }: { p: Priority }) {
  const c = PRIORITY_COLORS[p];
  return (
    <span
      className="text-[9px] font-bold rounded-[3px]"
      style={{ color: c, border: `1px solid ${c}40`, padding: "1px 5px" }}
    >
      {p}
    </span>
  );
}

const STATUS_MAP: Record<AgentStatusValue, [string, string]> = {
  active: ["#2d4a3e", "#5CB8B2"],
  idle: ["#3d3520", "#D4A843"],
  offline: ["#252220", "#6b6560"],
};

export function StatusBtn({
  status,
  onClick,
}: {
  status: AgentStatusValue;
  accent?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const [bg, fg] = STATUS_MAP[status] ?? STATUS_MAP.offline;
  return (
    <button
      onClick={onClick}
      className="border-none rounded-[10px] text-[10px] font-semibold cursor-pointer font-mono"
      style={{ background: bg, color: fg, padding: "2px 10px" }}
    >
      {status}
    </button>
  );
}
