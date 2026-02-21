"use client";

import type { MergeRequest } from "@/lib/types";
import { AGENTS } from "@/lib/agents";
import { Face } from "./Face";

const STATUS_STYLES: Record<string, { bg: string; fg: string }> = {
  IN_PROGRESS: { bg: "#3d352020", fg: "#D4A843" },
  READY_FOR_REVIEW: { bg: "#5CB8B220", fg: "#5CB8B2" },
  CHANGES_REQUESTED: { bg: "#C74B4B20", fg: "#C74B4B" },
  MERGED: { bg: "#5CB8B220", fg: "#7EAA63" },
};

export function ReviewsView({ mergeRequests }: { mergeRequests: MergeRequest[] }) {
  const pending = mergeRequests.filter((mr) => mr.status === "READY_FOR_REVIEW");
  const inProgress = mergeRequests.filter((mr) => mr.status === "IN_PROGRESS");
  const changesRequested = mergeRequests.filter((mr) => mr.status === "CHANGES_REQUESTED");
  const merged = mergeRequests.filter((mr) => mr.status === "MERGED");

  const sections = [
    { title: "Ready for Review", items: pending, accent: "#5CB8B2" },
    { title: "Changes Requested", items: changesRequested, accent: "#C74B4B" },
    { title: "In Progress", items: inProgress, accent: "#D4A843" },
    { title: "Merged", items: merged, accent: "#7EAA63" },
  ];

  return (
    <div className="max-w-[720px]">
      <div className="text-[10px] font-bold text-seon-dim tracking-widest uppercase mb-3">
        Merge Requests
      </div>
      {mergeRequests.length === 0 ? (
        <div className="text-[11px] text-seon-ghost italic">No merge requests yet</div>
      ) : (
        sections.map((section) =>
          section.items.length > 0 ? (
            <div key={section.title} className="mb-5">
              <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: section.accent }}>
                {section.title} ({section.items.length})
              </div>
              {section.items.map((mr) => {
                const agent = AGENTS.find((a) => a.id === mr.agent);
                const style = STATUS_STYLES[mr.status] ?? STATUS_STYLES.IN_PROGRESS;
                return (
                  <div
                    key={mr.id}
                    className="bg-seon-surface border border-seon-border rounded-lg p-3.5 mb-2"
                    style={{ borderLeft: `3px solid ${agent?.accent ?? "#555"}` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-seon-muted">{mr.id}</span>
                      <span className="text-sm font-semibold text-seon-text flex-1">{mr.title}</span>
                      <span
                        className="text-[9px] px-2 py-0.5 rounded"
                        style={{ background: style.bg, color: style.fg }}
                      >
                        {mr.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Face id={agent?.id ?? ""} size={20} color={agent?.accent} active />
                      <span className="text-[11px]" style={{ color: agent?.accent }}>
                        {agent?.name ?? mr.agent}
                      </span>
                      <span className="text-[9px] text-seon-ghost ml-auto">{mr.created}</span>
                    </div>

                    <div className="text-[10px] text-seon-faint font-mono mb-1">
                      {mr.branch}
                    </div>

                    {mr.summary && mr.summary !== "(pending)" && (
                      <div className="text-[11px] text-seon-muted mt-1.5">{mr.summary}</div>
                    )}

                    {mr.filesChanged && mr.filesChanged !== "(pending)" && (
                      <div className="text-[10px] text-seon-dim mt-1">
                        <span className="font-semibold">Files: </span>{mr.filesChanged}
                      </div>
                    )}

                    {mr.feedback && (
                      <div className="text-[11px] text-priority-p0 mt-1.5 bg-[#C74B4B10] rounded px-2 py-1">
                        <span className="font-semibold">Feedback: </span>{mr.feedback}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : null,
        )
      )}
    </div>
  );
}
