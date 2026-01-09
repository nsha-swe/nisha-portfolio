// app/layout.tsx
import "./globals.css";
import { Instrument_Serif } from "next/font/google";
import { Inter } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-headline",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Nisha Ahamed",
  description: "Full-stack engineer specializing in fintech, payment systems, and frontend architecture. Building reliable financial infrastructure.",
  // Make the browser UI (address bar) match your theme on mobile
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  // Use your Next App Router icon file (make sure app/icon.png exists)
  icons: {
    icon: "/icon.png?v=3",
    apple: "/icon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Quicksand everywhere by default; system dark mode colors */}
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
