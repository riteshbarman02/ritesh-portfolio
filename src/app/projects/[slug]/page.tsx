import React from 'react';
import { getProjectDataBySlug, getSortedProjectsData } from '../../../utils/project';
import ProjectPostClientPage from '../../../components/sections/ProjectPostClientPage';
import { Metadata } from 'next';

// Force static rendering for static export
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = getSortedProjectsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getProjectDataBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${post.title} | Project by Ritesh Barman`;
  const description = post.description || `Explore ${post.title}, a project built with ${post.tech || 'modern web technologies'} by Ritesh Barman.`;
  const url = `/projects/${post.slug}`;
  const image = post.thumbnail || '/svg/developer.svg';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} - Ritesh Barman Project`,
      description,
      url,
      type: "article",
      images: [
        {
          url: image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Ritesh Barman`,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = getProjectDataBySlug(slug);

  if (!post) {
    return <ProjectPostClientPage post={null} />;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://riteshbarman.in";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: post.title,
    description: post.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Ritesh Barman",
      url: siteUrl,
    },
    url: `${siteUrl}/projects/${post.slug}`,
    image: post.thumbnail ? (post.thumbnail.startsWith('http') ? post.thumbnail : `${siteUrl}${post.thumbnail}`) : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectPostClientPage post={post} />
    </>
  );
}

