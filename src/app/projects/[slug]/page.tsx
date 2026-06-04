import React from 'react';
import { getProjectDataBySlug, getSortedProjectsData } from '../../../utils/project';
import ProjectPostClientPage from '../../../components/sections/ProjectPostClientPage';

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

export default async function ProjectPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = getProjectDataBySlug(slug);

  return <ProjectPostClientPage post={post} />;
}
