"use client";

import { useState } from "react";
import { useDashboard } from "@/lib/hooks/use-dashboard";
import { AGENTS } from "@/lib/agents";
import type { ViewType } from "@/lib/types";
import { TopBar } from "./components/TopBar";
import { AgentDock } from "./components/AgentDock";
import { AgentDetail } from "./components/AgentDetail";
import { KanbanBoard } from "./components/KanbanBoard";
import { OverviewView } from "./components/OverviewView";
import { MessagesView } from "./components/MessagesView";
import { DecisionsView } from "./components/DecisionsView";
import { ReviewsView } from "./components/ReviewsView";

export default function DashboardPage() {
  const { state, connected } = useDashboard();
  const [view, setView] = useState<ViewType>("overview");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const activeCount = Object.values(state.agentStatuses).filter((s) => s === "active").length;
  const agent = selectedAgent ? AGENTS.find((a) => a.id === selectedAgent) : null;

  return (
    <div className="min-h-screen flex flex-col bg-seon-bg">
      <TopBar
        view={view}
        onViewChange={setView}
        activeCount={activeCount}
        connected={connected}
      />
      <AgentDock
        statuses={state.agentStatuses}
        selected={selectedAgent}
        onSelect={setSelectedAgent}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-5">
          {view === "overview" && (
            <OverviewView
              tasks={state.tasks}
              statuses={state.agentStatuses}
              commits={state.commits}
              onAgentClick={setSelectedAgent}
            />
          )}
          {view === "board" && <KanbanBoard tasks={state.tasks} />}
          {view === "messages" && (
            <MessagesView commits={state.commits} discussions={state.discussions} />
          )}
          {view === "decisions" && <DecisionsView decisions={state.decisions} />}
          {view === "reviews" && <ReviewsView mergeRequests={state.mergeRequests} />}
        </div>

        {agent && (
          <AgentDetail
            agent={agent}
            status={state.agentStatuses[agent.id] ?? "offline"}
            tasks={state.tasks}
            commits={state.commits}
            onClose={() => setSelectedAgent(null)}
          />
        )}
      </div>
    </div>
  );
}
