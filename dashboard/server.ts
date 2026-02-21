import { createServer } from "http";
import path from "path";
import fs from "fs";
import next from "next";

import { parseTaskBoard } from "./lib/parsers/task-board";
import { parseDecisions } from "./lib/parsers/decisions";
import { parseDiscussion } from "./lib/parsers/discussions";
import { parseMergeRequests } from "./lib/parsers/merge-requests";
import { parseGitLog } from "./lib/parsers/git-log";
import { deriveAgentStatuses } from "./lib/agents";
import { createWatcher } from "./lib/watcher";
import { createWSServer } from "./lib/ws-server";
import type { DashboardState } from "./lib/types";

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT ?? "3000", 10);

const projectRoot = path.resolve(__dirname, "..");

const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

function buildState(): DashboardState {
  const taskBoardPath = path.join(projectRoot, "shared", "TASK_BOARD.md");
  const decisionsPath = path.join(projectRoot, "shared", "DECISIONS.md");
  const mergeRequestsPath = path.join(projectRoot, "shared", "MERGE_REQUESTS.md");
  const discussionsDir = path.join(projectRoot, "shared", "discussions");

  const tasks = parseTaskBoard(readFile(taskBoardPath));
  const decisions = parseDecisions(readFile(decisionsPath));
  const mergeRequests = parseMergeRequests(readFile(mergeRequestsPath));

  let discussions: DashboardState["discussions"] = [];
  try {
    const files = fs.readdirSync(discussionsDir).filter((f) => f.endsWith(".md"));
    discussions = files.map((f) =>
      parseDiscussion(f, readFile(path.join(discussionsDir, f))),
    );
  } catch {
    // discussions dir may not exist
  }

  const commits = parseGitLog(projectRoot);
  const agentStatuses = deriveAgentStatuses(tasks);

  return {
    tasks,
    decisions,
    discussions,
    mergeRequests,
    commits,
    agentStatuses,
    lastUpdated: new Date().toISOString(),
  };
}

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const { wss, broadcast, sendFullState } = createWSServer(server);

  wss.on("connection", (ws) => {
    sendFullState(ws, buildState());
  });

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  createWatcher({
    projectRoot,
    onChange: () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        broadcast(buildState());
      }, 200);
    },
  });

  server.listen(port, () => {
    console.log(`> Soulcraft Dashboard running at http://localhost:${port}`);
    console.log(`> WebSocket at ws://localhost:${port}/ws`);
    console.log(`> Watching: ${projectRoot}/shared/`);
  });
});
