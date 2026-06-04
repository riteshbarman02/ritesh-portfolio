import React from 'react';
import { getSortedBlogsData } from '../../src/utils/blog';
import BlogClientPage from '../../src/components/sections/BlogClientPage';

// Force static rendering for static export
export const dynamic = 'force-static';

export default function BlogPage() {
  const blogs = getSortedBlogsData();
  return <BlogClientPage blogs={blogs} />;
}
