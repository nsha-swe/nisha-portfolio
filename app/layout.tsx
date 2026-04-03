// app/layout.tsx
import "./globals.css";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { GeistMono } from "geist/font/mono";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-headline",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
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
        className={`${cormorant.variable} ${montserrat.variable} ${GeistMono.variable} ${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
