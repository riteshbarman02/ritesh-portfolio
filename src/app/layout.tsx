import "../index.css";
import { Patrick_Hand, Architects_Daughter } from "next/font/google";
import { ThemeProvider } from "../context/ThemeContext";
import React, { ReactNode } from "react";
import ThemeAwareRibbons from "../components/ui/ThemeAwareRibbons";
import PullStringToggle from "../components/ui/PullStringToggle";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://riteshbarman.in";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ritesh Barman | Senior Software Developer & Creative Sketchbook",
    template: "%s | Ritesh Barman",
  },
  description:
    "Personal portfolio and creative sketchbook of Ritesh Barman, Senior Software Developer at eigenstudio & Dakshana Scholar. Specializing in full-stack web development, interactive 3D web applications, visual solvers, and system architecture.",
  keywords: [
    "Ritesh Barman",
    "Portfolio",
    "Sketchbook",
    "Senior Software Developer",
    "eigenstudio",
    "Dakshana Scholar",
    "Software Engineer",
    "Frontend Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Web Architecture",
    "UI/UX Design",
    "Raipur Developer",
    "India Software Engineer"
  ],
  authors: [{ name: "Ritesh Barman", url: "https://github.com/riteshbarman02" }],
  creator: "Ritesh Barman",
  publisher: "Ritesh Barman",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    title: "Ritesh Barman | Senior Software Developer & Creative Sketchbook",
    description:
      "Explore the interactive portfolio and sketchbook of Ritesh Barman. Featuring 3D workspaces, technical engineering blogs, and full-stack software projects.",
    url: siteUrl,
    siteName: "Ritesh Barman Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ritesh Barman | Senior Software Developer Portfolio & Interactive Sketchbook"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritesh Barman | Senior Software Developer",
    description:
      "Senior Software Developer at eigenstudio & Dakshana Scholar. Interactive portfolio, tech blogs, and software engineering projects.",
    creator: "@rites_02",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Ritesh Barman",
      jobTitle: "Senior Software Developer",
      image: `${siteUrl}/favicon.svg`,
      worksFor: {
        "@type": "Organization",
        name: "eigenstudio"
      },
      almaMater: "Government College of Engineering and Research, Raipur",
      description:
        "Senior Software Developer at eigenstudio, Dakshana Scholar specializing in full-stack engineering, interactive 3D web graphics, and system architecture.",
      url: siteUrl,
      sameAs: [
        "https://github.com/riteshbarman02",
        "https://www.linkedin.com/in/ritesbarman02/",
        "https://instagram.com/rites_02"
      ],
      knowsAbout: [
        "Software Engineering",
        "Frontend Engineering",
        "Full Stack Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Three.js",
        "System Design"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ritesh Barman Portfolio & Sketchbook",
      description:
        "Interactive portfolio, technical blogs, and software engineering projects of Ritesh Barman.",
      publisher: {
        "@id": `${siteUrl}/#person`
      },
      inLanguage: "en-US"
    }
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${patrickHand.variable} ${architectsDaughter.variable} light`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-background text-text relative overflow-x-hidden">
        <ThemeProvider>
          {children}
          <ThemeAwareRibbons />
          <PullStringToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
