import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Animated Landing — GSAP Motion Design",
  description:
    "Scroll-triggered landing page with GSAP ScrollTrigger and micro-interactions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${ibmMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
