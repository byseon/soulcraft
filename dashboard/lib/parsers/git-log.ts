import { execSync } from "child_process";
import type { GitCommit } from "../types";

export function parseGitLog(repoRoot: string, limit = 30): GitCommit[] {
  try {
    const raw = execSync(
      `git log --format="%h%x00%s%x00%an%x00%ai%x00%D" -${limit} --all`,
      { cwd: repoRoot, encoding: "utf-8", timeout: 5000 },
    );

    return raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, subject, author, date, refs] = line.split("\0");
        return { hash, subject, author, date, refs: refs ?? "" };
      });
  } catch {
    return [];
  }
}
