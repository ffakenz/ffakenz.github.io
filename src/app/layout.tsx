import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#14203B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ffakenz.github.io"),
  title: "Franco Testagrossa — Computer Scientist · Software Craftsman",
  description: "Personal site of Franco Testagrossa — engineer focused on high-throughput, event-driven, distributed systems.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
