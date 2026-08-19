import React from 'react';
import { getBlogDataBySlug, getSortedBlogsData } from '../../../utils/blog';
import BlogPostClientPage from '../../../components/sections/BlogPostClientPage';
import { Metadata } from 'next';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogDataBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const title = `${post.title} | Ritesh Barman Blog`;
  const description = post.description || `Read ${post.title} by ${post.author || 'Ritesh Barman'}.`;
  const url = `/blog/${post.slug}`;
  const image = post.coverImage || post.thumbnail || '/svg/blog.svg';

  return {
    title,
    description,
    authors: [{ name: post.author || 'Ritesh Barman' }],
    keywords: post.tags || [],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Ritesh Barman"],
      tags: post.tags || [],
      images: [
        {
          url: image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: "@rites_02",
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = getBlogDataBySlug(slug);

  if (!post) {
    return <BlogPostClientPage post={null} />;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://riteshbarman.in";
  const image = post.coverImage || post.thumbnail || '/svg/blog.svg';
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Ritesh Barman",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Ritesh Barman",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags ? post.tags.join(", ") : undefined,
    image: imageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClientPage post={post} />
    </>
  );
}

