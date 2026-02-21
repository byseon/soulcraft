import type { Discussion } from "../types";

export function parseDiscussion(filename: string, content: string): Discussion {
  const topicMatch = content.match(/^# Discussion: (.+)$/m);
  const createdMatch = content.match(/^> Created: (.+?) by @(\w+)/m);
  const participantsMatch = content.match(/^> Participants: (.+)$/m);
  const statusMatch = content.match(/^> Status: (OPEN|RESOLVED)/m);
  const positionHeaders = content.match(/^### @\w+/gm);

  const participants = participantsMatch
    ? participantsMatch[1].match(/@(\w+)/g)?.map((p) => p.slice(1)) ?? []
    : [];

  return {
    filename,
    topic: topicMatch?.[1] ?? filename,
    createdDate: createdMatch?.[1] ?? "",
    createdBy: createdMatch?.[2] ?? "",
    participants,
    status: (statusMatch?.[1] as "OPEN" | "RESOLVED") ?? "OPEN",
    positionCount: positionHeaders?.length ?? 0,
  };
}
