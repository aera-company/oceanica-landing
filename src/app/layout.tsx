import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const sans = Archivo({ subsets: ["latin"], variable: "--font-sans", axes: ["wdth"], display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Oceânica · Engineering the depth",
  description: "Concept study. Subsea engineering and offshore operations, from the surface to the seabed.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#02080d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
