import React from 'react';
import { getProjectDataBySlug, getSortedProjectsData } from '../../../src/utils/project';
import ProjectPostClientPage from '../../../src/components/sections/ProjectPostClientPage';

// Force static rendering for static export
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = getSortedProjectsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ProjectPostPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = getProjectDataBySlug(slug);

  return <ProjectPostClientPage post={post} />;
}
