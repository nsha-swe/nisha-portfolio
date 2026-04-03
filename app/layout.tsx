// app/layout.tsx
import "./globals.css";
import { Playfair_Display } from "next/font/google";
import { Lora } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-headline",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#05050f" },
    { media: "(prefers-color-scheme: dark)", color: "#05050f" },
  ],
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
      <body
        className={`${lora.variable} ${playfairDisplay.variable} ${ibmPlexMono.variable} ${lora.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
