"use client";

import usePartySocket from "partysocket/react";
import { Radio, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { PARTY_HOST } from "@/lib/party-config";

export function LiveLandingStats() {
  const [fps, setFps] = useState(60);
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
        setFps(data.fps);
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

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <div className="rounded-2xl border border-orange-500/20 bg-[#0f0a1a]/90 p-4 shadow-lg backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2">
          <Radio
            className={`h-3.5 w-3.5 ${connected ? "text-emerald-400" : "text-red-400"}`}
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] tracking-widest text-orange-400/70 uppercase">
            Live Telemetry
          </span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Zap className="h-3 w-3 text-orange-400" aria-hidden="true" />
              FPS
            </span>
            <span className="tabular-nums text-orange-300">{fps}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Users className="h-3 w-3 text-orange-400" aria-hidden="true" />
              Viewers
            </span>
            <span className="tabular-nums text-orange-300">{visitors}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-zinc-500">GPU</span>
            <span className="tabular-nums text-orange-300">{gpuLoad}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
