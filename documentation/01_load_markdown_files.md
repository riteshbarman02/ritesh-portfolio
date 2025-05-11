##  How to Load MD Files (Depending on Framework)

###  In **Next.js** (recommended for full control):

Use `gray-matter` to parse frontmatter and `remark` or `next-mdx-remote` to render markdown.

Install required packages:


```terminal
npm install gray-matter remark remark-html
```

**utils/getMarkdown.js:**

```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getMarkdownContent(fileName) {
  const filePath = path.join(process.cwd(), 'content', fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    frontmatter: data,
    contentHtml,
  };
}

```


**pages/index.js (Home):**

```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getMarkdownContent(fileName) {
  const filePath = path.join(process.cwd(), 'content', fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    frontmatter: data,
    contentHtml,
  };
}

```