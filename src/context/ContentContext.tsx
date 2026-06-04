"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

if (typeof window !== "undefined" && !(window as any).Buffer) {
  (window as any).Buffer = Buffer;
}

export interface ContentPage {
  metadata: {
    [key: string]: any;
  };
  body: string;
}

interface ContentContextType {
  home?: ContentPage;
  about?: ContentPage;
  contact?: ContentPage;
  projects: any[];
  [key: string]: any;
}

export const ContentContext = createContext<ContentContextType>({ projects: [] });

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<{ [key: string]: ContentPage }>({});
  const [projects, setProjects] = useState<any[]>([]);

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const joinPath = (baseStr: string, pathStr: string) => {
    const normalizedBase = baseStr.replace(/\/+$/, "");
    const normalizedPath = pathStr.replace(/^\/+/, "");
    return `${normalizedBase}/${normalizedPath}`.replace(/^\/{2,}/, "/");
  };

  const loadMarkdown = async (relativePath: string): Promise<ContentPage> => {
    try {
      const fullPath = joinPath(base, relativePath);
      const res = await fetch(fullPath);
      if (!res.ok) throw new Error(`Failed to load ${fullPath}: ${res.status}`);
      const text = await res.text();
      const { data, content } = matter(text);
      return { metadata: data, body: content };
    } catch (err) {
      console.error(err);
      return { metadata: {}, body: '' };
    }
  };

  useEffect(() => {
    const loadPages = async () => {
      try {
        const [home, about, contact] = await Promise.all([
          loadMarkdown('content/home.md'),
          loadMarkdown('content/about.md'),
          loadMarkdown('content/contact.md'),
        ]);
        setContent({ home, about, contact });
      } catch (err) {
        console.error("Failed to load pages:", err);
      }
    };

    const loadProjects = async () => {
      try {
        const indexUrl = joinPath(base, 'content/project/index.json');
        const res = await fetch(indexUrl);
        if (!res.ok) throw new Error(`Failed to fetch index.json: ${res.status}`);
        const fileList = await res.json() as string[];

        const projectData = await Promise.all(
          fileList.map(async (filename) => {
            const filePath = `content/project/${filename}`;
            const { metadata, body } = await loadMarkdown(filePath);
            const slug = filename.replace(/\.md$/, '');
            return { ...metadata, slug, body };
          })
        );

        setProjects(projectData);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };

    loadPages();
    loadProjects();
  }, []);

  return (
    <ContentContext.Provider value={{ ...content, projects }}>
      {children}
    </ContentContext.Provider>
  );
};
