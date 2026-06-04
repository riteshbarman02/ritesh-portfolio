"use client";

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Footer from './Footer';

const BlogPostClientPage = ({ post }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  if (!post) {
    return (
      <main className="w-full min-h-screen bg-background text-text flex items-center justify-center">
        <p className="font-cursive text-2xl">Page Not Found! 📭</p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-background text-text relative pb-10">
      {/* Floating Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="w-full max-w-4xl mx-auto px-6 pt-32 flex flex-col gap-6 pb-20">
        
        {/* Back Button */}
        <Link 
          href="/blog"
          className="font-cursive font-bold text-lg py-1 px-4 border-2 border-border doodle-border-sm doodle-clickable hover:bg-primary/10 hover:text-primary transition duration-150 self-start inline-flex items-center gap-2 bg-background text-text-heading"
        >
          ← Back to Notebook 📓
        </Link>

        {/* Notebook sheet container */}
        <article className="bg-background doodle-notebook-page p-8 bg-opacity-40 relative">
          {/* Red notebook line in light mode */}
          <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-red-400 opacity-20 pointer-events-none" />

          <div className="pl-8 flex flex-col gap-6">
            
            {/* Metadata headers */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2 text-sm font-cursive text-text-subheading font-bold">
                <span>{post.date}</span>
                <span>•</span>
                <span>By {post.author}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold font-cursive text-text-heading leading-tight">
                {post.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags && post.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-bold border border-border doodle-border-sm px-2 py-0.5 bg-background text-text-heading hover:rotate-2 transition duration-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-t-2 border-dashed border-border/10 my-2" />

            {/* Markdown Body using custom renderers */}
            <div className="font-body text-lg leading-relaxed text-text">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h2 className="text-3xl font-bold font-cursive text-text-heading mt-8 mb-4 border-b border-dashed border-border/10 pb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h3 className="text-2xl font-bold font-cursive text-text-heading mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h4 className="text-xl font-bold font-cursive text-text-heading mt-4 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-4 text-lg font-body leading-relaxed text-text" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-primary/5 italic font-body text-text-subheading doodle-border-sm" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-none pl-6 my-4 flex flex-col gap-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="relative font-body text-lg text-text" {...props}>
                      <span className="absolute -left-5 text-primary text-sm select-none">✏️</span>
                      {props.children}
                    </li>
                  ),
                  code: ({ node, inline, className, children, ...props }) => (
                    <code className="bg-primary/5 text-primary border border-border/10 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                      {children}
                    </code>
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="bg-background doodle-border-sm p-4 overflow-x-auto my-6 font-mono text-sm text-text-heading bg-opacity-80 border-2" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
};

export default BlogPostClientPage;
