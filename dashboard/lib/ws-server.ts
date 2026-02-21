import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";
import type { DashboardState } from "./types";

export function createWSServer(server: Server) {
  const wss = new WebSocketServer({ server, path: "/ws" });

  function broadcast(state: DashboardState) {
    const msg = JSON.stringify({ type: "update", data: state });
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  }

  function sendFullState(ws: WebSocket, state: DashboardState) {
    ws.send(JSON.stringify({ type: "full_state", data: state }));
  }

  return { wss, broadcast, sendFullState };
}
