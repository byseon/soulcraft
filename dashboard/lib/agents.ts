import type { Agent, AgentStatusValue, Task } from "./types";

export const AGENTS: Agent[] = [
  { id: "hal", name: "HAL", role: "PM / Orchestrator", tier: "lead", accent: "#E8845C", model: "opus" },
  { id: "koah", name: "Koah", role: "Backend Engineer", tier: "core", accent: "#5CB8B2", model: "sonnet" },
  { id: "dia", name: "Dia", role: "Frontend Engineer", tier: "core", accent: "#D4A843", model: "sonnet" },
  { id: "yua", name: "Yua", role: "UI/UX Designer", tier: "support", accent: "#A78BDB", model: "sonnet" },
  { id: "luna", name: "Luna", role: "Marketing Lead", tier: "support", accent: "#D87A93", model: "sonnet" },
  { id: "sia", name: "Sia", role: "Data Analyst", tier: "support", accent: "#5BA3C9", model: "sonnet" },
  { id: "steve", name: "Steve", role: "CTO / Architect", tier: "support", accent: "#7EAA63", model: "opus" },
  { id: "bezos", name: "Bezos", role: "DevOps / Ops", tier: "support", accent: "#CC7B52", model: "sonnet" },
  { id: "boa", name: "Boa", role: "Security Auditor", tier: "audit", accent: "#C74B4B", model: "sonnet" },
  { id: "tea", name: "Tea", role: "QA / Testing", tier: "audit", accent: "#4B9E8E", model: "sonnet" },
  { id: "doa", name: "Doa", role: "Technical Writer", tier: "support", accent: "#BFA84E", model: "sonnet" },
  { id: "neo", name: "Neo", role: "ML Researcher", tier: "support", accent: "#8254A8", model: "opus" },
];

export function deriveAgentStatuses(tasks: Task[]): Record<string, AgentStatusValue> {
  const statuses: Record<string, AgentStatusValue> = {};
  for (const agent of AGENTS) {
    const agentTasks = tasks.filter((t) => t.agent === agent.id);
    const hasInProgress = agentTasks.some((t) => t.status === "in_progress");
    const hasReview = agentTasks.some((t) => t.status === "review");
    const hasBacklog = agentTasks.some((t) => t.status === "backlog");

    if (hasInProgress) {
      statuses[agent.id] = "active";
    } else if (hasReview || hasBacklog) {
      statuses[agent.id] = "idle";
    } else {
      statuses[agent.id] = "offline";
    }
  }
  return statuses;
}
