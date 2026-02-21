import type { Decision } from "../types";

export function parseDecisions(content: string): Decision[] {
  const blocks = content.split(/(?=^### ADR-)/m);
  const decisions: Decision[] = [];

  for (const block of blocks) {
    const headerMatch = block.match(/^### (ADR-\d+): (.+)$/m);
    if (!headerMatch) continue;

    const field = (label: string): string => {
      const re = new RegExp(`^- \\*\\*${label}\\*\\*:\\s*(.+)$`, "m");
      const m = block.match(re);
      return m ? m[1].trim() : "";
    };

    decisions.push({
      id: headerMatch[1],
      title: headerMatch[2],
      date: field("Date"),
      decidedBy: field("Decided by"),
      decision: field("Decision"),
      rationale: field("Rationale"),
      tradeoff: field("Tradeoff"),
    });
  }

  return decisions;
}
