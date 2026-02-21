import type { MergeRequest, MRStatus } from "../types";

export function parseMergeRequests(content: string): MergeRequest[] {
  const blocks = content.split(/(?=^### MR-)/m);
  const mergeRequests: MergeRequest[] = [];

  for (const block of blocks) {
    const headerMatch = block.match(/^### (MR-\w+): (.+)$/m);
    if (!headerMatch) continue;

    const field = (label: string): string => {
      const re = new RegExp(`^- \\*\\*${label}\\*\\*:\\s*(.+)$`, "m");
      const m = block.match(re);
      return m ? m[1].trim() : "";
    };

    mergeRequests.push({
      id: headerMatch[1],
      title: headerMatch[2],
      agent: field("Agent").replace("@", ""),
      branch: field("Branch"),
      worktree: field("Worktree"),
      status: (field("Status") as MRStatus) || "IN_PROGRESS",
      created: field("Created"),
      submitted: field("Submitted"),
      filesChanged: field("Files changed"),
      summary: field("Summary"),
      feedback: field("Feedback"),
    });
  }

  return mergeRequests;
}
