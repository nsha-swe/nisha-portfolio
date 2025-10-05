// app/layout.tsx
import "./globals.css";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Nisha Ahamed",
  description: "Portfolio — coming soon",
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
        className={`${quicksand.className} antialiased bg-white text-black dark:bg-neutral-950 dark:text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
