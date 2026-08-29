"use client";

import usePartySocket from "partysocket/react";
import { useEffect, useState } from "react";
import { useRealFps } from "@/hooks/use-real-fps";
import { PARTY_HOST } from "@/lib/party-config";

export function useLandingTelemetry() {
  const realFps = useRealFps();
  const [visitors, setVisitors] = useState(1);
  const [gpuLoad, setGpuLoad] = useState(15);
  const [connected, setConnected] = useState(false);
  const [visitorName] = useState(() => `Motion-${Math.floor(Math.random() * 900 + 100)}`);

  usePartySocket({
    host: PARTY_HOST,
    room: "ecosystem",
    onOpen(evt) {
      const ws = evt.target as WebSocket;
      ws.send(
        JSON.stringify({
          type: "ecosystem-join",
          name: visitorName,
          color: "#fb923c",
          app: "landing",
        }),
      );
    },
  });

  const socket = usePartySocket({
    host: PARTY_HOST,
    room: "landing",
    onOpen() {
      setConnected(true);
    },
    onClose() {
      setConnected(false);
    },
    onMessage(evt) {
      const data = JSON.parse(evt.data);
      if (data.type === "landing-pulse") {
        setVisitors(data.visitors);
        setGpuLoad(data.gpuLoad);
      }
    },
  });

  useEffect(() => {
    const onScroll = () => {
      const depth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100,
      );
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "scroll-depth", depth }));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [socket]);

  useEffect(() => {
    if (socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify({ type: "fps-report", fps: realFps }));
    const id = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "fps-report", fps: realFps }));
      }
    }, 2000);
    return () => clearInterval(id);
  }, [socket, realFps]);

  return { fps: realFps, visitors, gpuLoad, connected, visitorName };
}
