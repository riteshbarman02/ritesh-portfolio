"use client";

import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import Footer from './Footer';
import { BlogPost } from '../../utils/blog';

interface BlogClientPageProps {
  blogs: BlogPost[];
}

const BlogClientPage = ({ blogs }: BlogClientPageProps) => {
  return (
    <main className="w-full min-h-screen bg-background text-text relative pb-10">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-32 flex flex-col gap-10 pb-20">
        
        {/* Blog Header */}
        <div className="text-center md:text-left flex flex-col gap-3">
          <h1 className="text-5xl font-bold font-cursive text-text-heading doodle-underline w-fit mx-auto md:mx-0">
            Sketchbook Blog 📝
          </h1>
          <p className="text-xl font-body text-text-subheading font-bold">
            ~ Thoughts, notes, and coding adventures ~
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-background doodle-border-sm doodle-shadow">
            <p className="font-cursive text-2xl">The notebook is currently empty! Check back later ✏️</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article 
                key={post.slug} 
                className="bg-background doodle-notebook-page p-2 flex flex-col justify-between hover:-rotate-1 hover:scale-[1.01] transition-all duration-200"
              >
                {/* Red margin line in light mode */}
                <div className="absolute top-0 bottom-0 left-4 w-[2px] bg-red-400 opacity-20 pointer-events-none" />

                <div className="pl-6 flex flex-col gap-4">
                  {/* Thumbnail */}
                  {post.thumbnail && (
                    <div className="w-full aspect-[16/8] overflow-hidden doodle-border-sm bg-primary/5">
                      <img 
                        className="w-full h-full " 
                        src={post.thumbnail} 
                        alt={post.title} 
                      />
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-sm font-cursive text-text-subheading font-bold">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold font-cursive text-text-heading hover:text-primary transition duration-150 line-clamp-2">
                    <Link href={`/blog/${post.slug}/`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-sm font-body text-text leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Tags and Action */}
                <div className="pl-6 mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dashed border-border/10">
                  {/* Tag list */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags && post.tags.map((tag: string, i: number) => (
                      <span 
                        key={i} 
                        className="text-xs font-bold border border-border doodle-border-sm px-2 py-0.5 bg-background text-text-heading hover:-rotate-3 transition duration-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Link */}
                  <Link 
                    href={`/blog/${post.slug}/`}
                    className="font-cursive font-bold text-lg py-1 px-4 border-2 border-border doodle-border-sm doodle-clickable hover:bg-primary/10 hover:text-primary transition duration-150 inline-block bg-background text-text-heading"
                  >
                    Read Page 📖
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default BlogClientPage;
