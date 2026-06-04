import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'public/content/blog');

export function getSortedBlogsData() {
  // Get file names under /public/content/blog
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogDirectory);
  const allBlogsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Combine the data with the slug and body content
      return {
        slug,
        content,
        title: data.title || 'Untitled Post',
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        author: data.author || 'Ritesh Barman',
        tags: data.tags || [],
        thumbnail: data.thumbnail || '/svg/blog.svg',
        ...data,
      };
    });

  // Sort blogs by date
  return allBlogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getBlogDataBySlug(slug) {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title || 'Untitled Post',
    date: data.date || new Date().toISOString().split('T')[0],
    description: data.description || '',
    author: data.author || 'Ritesh Barman',
    tags: data.tags || [],
    thumbnail: data.thumbnail || '/svg/blog.svg',
    ...data,
  };
}
