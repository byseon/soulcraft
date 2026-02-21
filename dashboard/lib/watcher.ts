import { watch, type FSWatcher } from "chokidar";
import path from "path";

export interface WatcherOptions {
  projectRoot: string;
  onChange: (filePath: string) => void;
}

export function createWatcher({ projectRoot, onChange }: WatcherOptions): FSWatcher {
  const sharedDir = path.join(projectRoot, "shared");
  const gitRefsDir = path.join(projectRoot, ".git", "refs", "heads");
  const gitHead = path.join(projectRoot, ".git", "HEAD");

  const watcher = watch(
    [
      path.join(sharedDir, "TASK_BOARD.md"),
      path.join(sharedDir, "DECISIONS.md"),
      path.join(sharedDir, "discussions", "*.md"),
      gitRefsDir,
      gitHead,
    ],
    {
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 300 },
    },
  );

  watcher.on("change", onChange);
  watcher.on("add", onChange);
  watcher.on("unlink", onChange);

  return watcher;
}
