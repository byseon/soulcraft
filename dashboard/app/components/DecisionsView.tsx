"use client";

import type { Decision } from "@/lib/types";

export function DecisionsView({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="max-w-[720px]">
      <div className="text-[10px] font-bold text-seon-dim tracking-widest uppercase mb-3">
        Architecture Decision Records
      </div>
      {decisions.length === 0 ? (
        <div className="text-[11px] text-seon-ghost italic">No decisions recorded yet</div>
      ) : (
        decisions.map((d) => (
          <div
            key={d.id}
            className="bg-seon-surface border border-seon-border rounded-lg p-4 mb-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-seon-accent">{d.id}</span>
              <span className="text-sm font-semibold text-seon-text">{d.title}</span>
              <span className="text-[9px] text-seon-ghost ml-auto">{d.date}</span>
            </div>
            <div className="text-xs text-[#c0bbb4] mb-2">{d.decision}</div>
            {d.rationale && (
              <div className="text-[11px] text-seon-muted mb-1">
                <span className="text-seon-dim font-semibold">Rationale: </span>
                {d.rationale}
              </div>
            )}
            {d.tradeoff && (
              <div className="text-[11px] text-seon-muted mb-1">
                <span className="text-seon-dim font-semibold">Tradeoff: </span>
                {d.tradeoff}
              </div>
            )}
            <div className="text-[10px] text-seon-faint mt-2">
              Decided by: {d.decidedBy}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
