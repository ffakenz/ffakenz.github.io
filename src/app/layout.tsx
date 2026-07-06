import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space-grotesk", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#14203B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ffakenz.github.io"),
  title: "Franco Testagrossa — Computer Scientist · Software Craftsman",
  description: "Personal site of Franco Testagrossa — engineer focused on high-throughput, event-driven, distributed systems. Core Cardano Hydra contributor.",
  openGraph: {
    title: "Franco Testagrossa",
    description: "Computer Scientist · Software Craftsman · Blockchain Advocate · AI Enthusiast",
    url: "https://ffakenz.github.io/",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="bg-paper text-ink flex min-h-screen flex-col antialiased">
        <main id="main" className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
