import React from 'react';
import { getBlogDataBySlug, getSortedBlogsData } from '../../../utils/blog';
import BlogPostClientPage from '../../../components/sections/BlogPostClientPage';

// Force static rendering for static export
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = getSortedBlogsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = getBlogDataBySlug(slug);

  return <BlogPostClientPage post={post} />;
}
