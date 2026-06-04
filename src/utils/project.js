import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'public/content/project');

export function getSortedProjectsData() {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
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

export function getProjectDataBySlug(slug) {
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
