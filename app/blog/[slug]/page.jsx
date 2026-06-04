import React from 'react';
import { getBlogDataBySlug, getSortedBlogsData } from '../../../src/utils/blog';
import BlogPostClientPage from '../../../src/components/sections/BlogPostClientPage';

// Force static rendering for static export
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = getSortedBlogsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = getBlogDataBySlug(slug);

  return <BlogPostClientPage post={post} />;
}
