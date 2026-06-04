---
title: "Static Exports in Next.js: Deploying Anywhere"
date: "2026-06-04"
description: "How to compile and deploy Next.js apps with zero-cost static hosting platforms using the static export feature."
author: "Ritesh Barman"
tags: ["Next.js", "Hosting", "Performance"]
thumbnail: "/svg/blog.svg"
---

# Next.js Static Exports: Build and Deploy Anywhere

Next.js is famous for server-side rendering (SSR), but it is also an extremely powerful static site generator (SSG). By enabling static exports, Next.js compiles your pages into pure static HTML, CSS, and JavaScript.

This enables you to host your website on zero-cost, high-performance static hosting platforms like GitHub Pages, Netlify, or Firebase Hosting.

---

## How It Works

To enable static exports, update your `next.config.js` or `next.config.mjs` config:

```javascript
const nextConfig = {
  output: 'export',
};
```

When you run `npm run build`, Next.js will:
1. Compile your pages and dynamic routes.
2. Read markdown files or fetch APIs at build-time.
3. Generate static HTML and asset files into the `out/` directory.

---

## Dynamic Routes in Static Exports

If you have dynamic routes like `app/blog/[slug]/page.jsx`, Next.js needs to know all the possible paths at build time. We use `generateStaticParams()` to provide this list:

```javascript
export async function generateStaticParams() {
  const posts = getSortedBlogsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

Next.js will invoke this function during the build phase and generate a static HTML page for each slug.

---

## Benefits of Static Exports

* **Super Fast Loading:** Statically served pages are loaded instantly from CDN caches, improving Core Web Vitals (LCP, INP).
* **Cost Effective:** Static files require no node servers running, leading to zero hosting costs.
* **Highly Secure:** With no backend server, there are no runtime databases or server vulnerabilities to exploit.

Happy hacking! 🚀
