"use client";

import { useEffect, useState } from "react";

export type WebVitals = {
  lcp: number | null;
  cls: number | null;
  inp: number | null;
};

export function useWebVitals(): WebVitals {
  const [vitals, setVitals] = useState<WebVitals>({ lcp: null, cls: null, inp: null });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            setVitals((v) => ({ ...v, lcp: Math.round(entry.startTime) }));
          }
          if (entry.entryType === "layout-shift" && !(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
            setVitals((v) => ({
              ...v,
              cls: Math.round(((v.cls ?? 0) + (entry as PerformanceEntry & { value?: number }).value!) * 1000) / 1000,
            }));
          }
          if (entry.entryType === "event") {
            const dur = (entry as PerformanceEntry & { duration?: number }).duration;
            if (dur) setVitals((v) => ({ ...v, inp: Math.round(dur) }));
          }
        }
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
      po.observe({ type: "layout-shift", buffered: true });
      try {
        po.observe({ type: "event", buffered: true } as PerformanceObserverInit);
      } catch {
        /* INP not supported */
      }
      return () => po.disconnect();
    } catch {
      return;
    }
  }, []);

  return vitals;
}
