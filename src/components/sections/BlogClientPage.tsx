"use client";

import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import Footer from './Footer';
import { BlogPost } from '../../utils/blog';
import { getTagColor } from '../../utils/tagColors';

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
          <h1 className="text-4xl font-bold font-cursive text-text-heading doodle-underline w-fit mx-auto md:mx-0">
            Sketchbook Blog
          </h1>
          <p className="text-lg font-body text-text-subheading font-bold">
            Thoughts, notes, and coding adventures
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-background doodle-border-sm doodle-shadow">
            <p className="font-cursive text-2xl">The notebook is currently empty! Check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article 
                key={post.slug} 
                className="bg-background doodle-border-sm doodle-shadow doodle-clickable p-4 flex flex-col gap-4 bg-opacity-40 hover:-rotate-2 transition-all duration-200 h-full justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  {post.thumbnail && (
                    <div className="w-full aspect-[16/10] overflow-hidden doodle-border-sm bg-primary/5 mb-3">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  {/* Title Link */}
                  <h2 className="text-xl font-bold font-cursive text-text-heading hover:text-primary hover:scale-102 transition duration-150 line-clamp-2">
                    <Link href={`/blog/${post.slug}/`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-sm font-cursive text-text-subheading font-bold mt-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 line-clamp-2">
                      {post.tags.slice(0, 3).map((tag: string, idx: number) => {
                        const color = getTagColor(idx);
                        return (
                          <span 
                            key={idx}
                            style={{
                        
                              borderColor: color.border,
                              color: color.text,
                            }}
                            className="text-xs font-bold border doodle-border-sm px-2 py-0.5 hover:-rotate-3 transition duration-100"
                          >
                            #{tag}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Blog Description */}
                  <p className="text-sm font-body text-text mt-3 line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Read Post Link button */}
                <Link 
                  href={`/blog/${post.slug}/`}
                  className="text-center font-cursive font-bold text-lg mt-2 py-1 px-4 border-2 border-border doodle-border-sm hover:bg-primary/10 hover:text-primary transition duration-150 self-start inline-block bg-background text-text-heading"
                >
                  Read More
                </Link>
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
