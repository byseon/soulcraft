"use client";

import type { Task, TaskStatus } from "@/lib/types";
import { Dot } from "./StatusBadge";
import { TaskCard } from "./TaskCard";

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: "backlog", title: "Backlog", color: "#6b6560" },
  { id: "in_progress", title: "In Progress", color: "#D4A843" },
  { id: "review", title: "Review", color: "#A78BDB" },
  { id: "done", title: "Done", color: "#5CB8B2" },
];

function Column({ title, color, tasks }: { title: string; color: string; tasks: Task[] }) {
  return (
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="flex items-center gap-2 mb-2.5">
        <Dot color={color} />
        <span
          className="text-[11px] font-bold tracking-wider uppercase"
          style={{ color }}
        >
          {title}
        </span>
        <span className="text-[10px] text-seon-faint ml-auto">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-1.5 flex-1 overflow-auto">
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}

export function KanbanBoard({ tasks }: { tasks: Task[] }) {
  return (
    <div className="flex gap-3" style={{ height: "calc(100vh - 130px)" }}>
      {COLUMNS.map((col) => (
        <Column
          key={col.id}
          title={col.title}
          color={col.color}
          tasks={tasks.filter((t) => t.status === col.id)}
        />
      ))}
    </div>
  );
}
