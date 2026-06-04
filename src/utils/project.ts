import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'public/content/project');

export interface Project {
  slug: string;
  content: string;
  title: string;
  tech: string;
  thumbnail: string;
  link: string;
  github: string;
  description: string;
  date: string;
  [key: string]: any;
}

export function getSortedProjectsData(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData: Project[] = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');

      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title || 'Untitled Project',
        tech: data.tech || '',
        thumbnail: data.thumbnail || '/svg/developer.svg',
        link: data.link || '',
        github: data.github || '',
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        ...data,
      };
    });

  // Sort projects by date descending
  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getProjectDataBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title || 'Untitled Project',
    tech: data.tech || '',
    thumbnail: data.thumbnail || '/svg/developer.svg',
    link: data.link || '',
    github: data.github || '',
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    ...data,
  };
}
