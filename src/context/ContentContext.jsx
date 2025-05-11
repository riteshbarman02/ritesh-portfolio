import React, { createContext, useState, useEffect } from 'react';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});

  const loadMarkdown = async (filename) => {
    const res = await fetch(`/content/${filename}`);
    const text = await res.text();
    const { data, content } = matter(text);
    return { metadata: data, body: content };
  };

  useEffect(() => {
    const loadAll = async () => {
      const [home, about, projects, contact] = await Promise.all([
        loadMarkdown('home.md'),
        loadMarkdown('about.md'),
        loadMarkdown('projects.md'),
        loadMarkdown('contact.md'),
      ]);

      setContent({
        home,
        about,
        projects,
        contact,
      });
    };

    loadAll();
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
};
