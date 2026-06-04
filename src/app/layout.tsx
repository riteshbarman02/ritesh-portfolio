import "../index.css";
import { Patrick_Hand, Architects_Daughter } from "next/font/google";
import { ThemeProvider } from "../context/ThemeContext";
import React, { ReactNode } from "react";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Ritesh Barman | Portfolio & Sketchbook",
  description: "Personal portfolio and creative sketchbook of Ritesh Barman, SDE at eigenstudio. Dakshana Scholar specializing in frontend engineering, interactive web applications, and system architecture.",
  keywords: [
    "Ritesh Barman",
    "Portfolio",
    "Sketchbook",
    "SDE",
    "software engineer",
    "web developer",
    "eigenstudio",
    "Dakshana Scholar",
    "React",
    "Next.js",
    "TypeScript"
  ],
  authors: [{ name: "Ritesh Barman" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    title: "Ritesh Barman | Portfolio & Sketchbook",
    description: "Creative developer portfolio showing interactive 3D workspaces, software engineering blogs, and featured projects.",
    type: "website",
    locale: "en_US",
    siteName: "Ritesh Barman Portfolio"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${patrickHand.variable} ${architectsDaughter.variable} light`}
    >
      <body className="font-body bg-background text-text">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
