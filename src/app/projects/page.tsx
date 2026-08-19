import React from 'react';
import { getSortedProjectsData } from '../../utils/project';
import ProjectsClientPage from '../../components/sections/ProjectsClientPage';
import { Metadata } from 'next';

// Force static rendering for static export
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Projects | Ritesh Barman",
  description:
    "Explore software engineering projects created by Ritesh Barman, including web music streaming applications, interactive quizzes, escape rooms, weather platforms, and asset optimization tools.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Applications | Ritesh Barman Portfolio",
    description:
      "A curated collection of web applications, full-stack tools, interactive games, and engineering software built by Ritesh Barman.",
    url: "/projects",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ritesh Barman Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Showcase | Ritesh Barman",
    description:
      "A showcase of interactive web applications, frontend experiments, and full-stack software built by Ritesh Barman.",
  },
};

export default function ProjectsPage() {
  const projects = getSortedProjectsData();
  return <ProjectsClientPage projects={projects} />;
}

