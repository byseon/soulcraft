import type { Task, TaskStatus, Priority } from "../types";

const TASK_RE = /^- \[([ x])\] `(T\d+)` (.+?) @(\w+) #([\w-]+) (P[0-3])$/;

const SECTION_MAP: Record<string, TaskStatus> = {
  "## Backlog": "backlog",
  "## In Progress": "in_progress",
  "## Review": "review",
  "## Done": "done",
};

export function parseTaskBoard(content: string): Task[] {
  const lines = content.split("\n");
  const tasks: Task[] = [];
  let currentStatus: TaskStatus = "backlog";

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for section headers
    for (const [header, status] of Object.entries(SECTION_MAP)) {
      if (trimmed.startsWith(header)) {
        currentStatus = status;
        break;
      }
    }

    const match = trimmed.match(TASK_RE);
    if (match) {
      tasks.push({
        id: match[2].toLowerCase(),
        title: match[3],
        agent: match[4],
        project: match[5],
        status: currentStatus,
        priority: match[6] as Priority,
        done: match[1] === "x",
      });
    }
  }

  return tasks;
}
