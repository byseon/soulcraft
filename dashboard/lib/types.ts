export type Priority = "P0" | "P1" | "P2" | "P3";
export type TaskStatus = "backlog" | "in_progress" | "review" | "done";
export type AgentStatusValue = "active" | "idle" | "offline";
export type Tier = "lead" | "core" | "support" | "audit";
export type ViewType = "overview" | "board" | "messages" | "decisions";

export interface Task {
  id: string;
  title: string;
  agent: string;
  project: string;
  status: TaskStatus;
  priority: Priority;
  done: boolean;
}

export interface Decision {
  id: string;
  title: string;
  date: string;
  decidedBy: string;
  decision: string;
  rationale: string;
  tradeoff: string;
}

export interface Discussion {
  filename: string;
  topic: string;
  createdDate: string;
  createdBy: string;
  participants: string[];
  status: "OPEN" | "RESOLVED";
  positionCount: number;
}

export interface GitCommit {
  hash: string;
  subject: string;
  author: string;
  date: string;
  refs: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  tier: Tier;
  accent: string;
  model: "opus" | "sonnet";
}

export interface AgentStatus {
  id: string;
  status: AgentStatusValue;
}

export interface DashboardState {
  tasks: Task[];
  decisions: Decision[];
  discussions: Discussion[];
  commits: GitCommit[];
  agentStatuses: Record<string, AgentStatusValue>;
  lastUpdated: string;
}

export type WSMessage =
  | { type: "full_state"; data: DashboardState }
  | { type: "update"; data: DashboardState };
