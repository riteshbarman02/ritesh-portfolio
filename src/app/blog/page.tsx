import React from 'react';
import { getSortedBlogsData } from '../../utils/blog';
import BlogClientPage from '../../components/sections/BlogClientPage';
import { Metadata } from 'next';

// Force static rendering for static export
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Blog & Articles | Ritesh Barman",
  description:
    "Engineering insights, guides, and tutorials written by Ritesh Barman. Topics include custom domain DNS setups, Git submodule CI/CD workflows, SSH key management, 3D web physics, CSS effects, and system design.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Engineering Blog & Technical Articles | Ritesh Barman",
    description:
      "In-depth software development guides, WebGL 3D tutorials, system design patterns, and DevOps workflows written by Senior Software Developer Ritesh Barman.",
    url: "/blog",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ritesh Barman Technical Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Tech Articles | Ritesh Barman",
    description:
      "Software engineering guides, 3D web graphics, DNS setups, and DevOps workflows by Ritesh Barman.",
  },
};

export default function BlogPage() {
  const blogs = getSortedBlogsData();
  return <BlogClientPage blogs={blogs} />;
}

