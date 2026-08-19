import React from 'react';
import AboutClientPage from '../../components/sections/AboutClientPage';
import { Metadata } from 'next';

// Force static rendering for static export
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "About Me | Ritesh Barman",
  description:
    "Learn more about Ritesh Barman, Senior Software Developer at eigenstudio, Dakshana Scholar, and B.Tech graduate from Government College of Engineering, Raipur. Explore career experience, engineering skills, and academic background.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ritesh Barman | Senior Software Developer & Dakshana Scholar",
    description:
      "Full-stack software developer, node-graph editor architect, and UI/UX engineer. Read about Ritesh Barman's experience at eigenstudio, Avkalan Labs, and background as a Dakshana Scholar.",
    url: "/about",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Ritesh Barman | Senior Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ritesh Barman | Senior Software Developer",
    description:
      "Senior Software Developer at eigenstudio & Dakshana Scholar specializing in full-stack web applications and visual tools.",
  },
};

export default function AboutPage() {
  return <AboutClientPage />;
}

