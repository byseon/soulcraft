"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { DashboardState, WSMessage } from "../types";

const RECONNECT_DELAY = 2000;

const EMPTY_STATE: DashboardState = {
  tasks: [],
  decisions: [],
  discussions: [],
  commits: [],
  agentStatuses: {},
  lastUpdated: "",
};

export function useDashboard() {
  const [state, setState] = useState<DashboardState>(EMPTY_STATE);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws`);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);

    ws.onmessage = (event) => {
      try {
        const msg: WSMessage = JSON.parse(event.data);
        if (msg.type === "full_state" || msg.type === "update") {
          setState(msg.data);
        }
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      setConnected(false);
      wsRef.current = null;
      reconnectRef.current = setTimeout(connect, RECONNECT_DELAY);
    };

    ws.onerror = () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return { state, connected };
}
