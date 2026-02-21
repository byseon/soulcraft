"use client";

import { useState, useEffect } from "react";
import type { ViewType } from "@/lib/types";

const VIEWS: ViewType[] = ["overview", "board", "messages", "decisions", "reviews"];

interface TopBarProps {
  view: ViewType;
  onViewChange: (v: ViewType) => void;
  activeCount: number;
  connected: boolean;
}

export function TopBar({ view, onViewChange, activeCount, connected }: TopBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center px-5 py-2.5 border-b border-seon-border bg-seon-bg sticky top-0 z-10">
      <span className="text-base font-extrabold text-seon-accent tracking-[3px]">SEON</span>
      <span className="text-[10px] text-seon-dim ml-1.5 tracking-wider">control</span>

      <div className="flex gap-0.5 ml-8">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => onViewChange(v)}
            className="bg-transparent border-none px-3.5 py-1.5 text-[11px] cursor-pointer font-mono transition-colors"
            style={{
              color: view === v ? "#e0dbd4" : "#6b6560",
              borderBottom: view === v ? "1.5px solid #E8845C" : "1.5px solid transparent",
            }}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: connected ? "#5CB8B2" : "#C74B4B" }}
          title={connected ? "Connected" : "Disconnected"}
        />
        <span className="text-[11px] text-seon-faint">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <span className="text-[10px] text-status-active">{activeCount} active</span>
      </div>
    </div>
  );
}
