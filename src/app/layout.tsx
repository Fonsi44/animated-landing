import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import { AmbientBackground } from "@/components/ambient-background";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Pulse — Motion Analytics Landing",
  description:
    "Scroll-triggered landing page with GSAP ScrollTrigger and live telemetry via Partykit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${ibmMono.variable} h-full`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-[#030306] font-sans text-zinc-100 antialiased">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
