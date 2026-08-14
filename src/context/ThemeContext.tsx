"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleThemeWithTransition: (eventOrCoords?: any) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize theme from localStorage on client-side mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      setDarkMode(false);
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemDark);
    }
    setMounted(true);
  }, []);

  // Update root HTML class and save theme to localStorage when darkMode changes
  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode, mounted]);

  const toggleThemeWithTransition = (eventOrCoords?: any) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const doc = document as any;
    // Fallback if View Transitions API is not supported
    if (!doc.startViewTransition) {
      setDarkMode((prev) => !prev);
      setIsTransitioning(false);
      return;
    }

    // Default to top-right corner if no event/coordinates are passed
    let x = window.innerWidth - 40;
    let y = 40;

    if (eventOrCoords) {
      if (typeof eventOrCoords.clientX === 'number' && typeof eventOrCoords.clientY === 'number') {
        x = eventOrCoords.clientX;
        y = eventOrCoords.clientY;
      }
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setDarkMode((prev) => !prev);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 750, // slow and smooth like a wave (750ms)
          easing: 'cubic-bezier(0.25, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      ).onfinish = () => {
        setIsTransitioning(false);
      };
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleThemeWithTransition, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
