import { NextResponse } from 'next/server';
import { getSortedProjectsData } from '../../../utils/project';
import { getSortedBlogsData } from '../../../utils/blog';

export const dynamic = 'force-static';

export async function GET() {
  const projects = getSortedProjectsData();
  const blogs = getSortedBlogsData();

  const results: any[] = [];

  // Search projects
  projects.forEach((proj) => {
    results.push({
      id: `project-${proj.slug}`,
      type: 'project',
      title: proj.title || '',
      description: proj.description || '',
      url: `/projects/${proj.slug}`,
      tech: proj.tech || '',
      tags: proj.tags || [],
      date: proj.date || ''
    });
  });

  // Search blogs
  blogs.forEach((post) => {
    results.push({
      id: `blog-${post.slug}`,
      type: 'blog',
      title: post.title || '',
      description: post.description || '',
      url: `/blog/${post.slug}`,
      tags: post.tags || [],
      date: post.date || ''
    });
  });

  return NextResponse.json({ results });
}

