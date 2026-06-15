"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleThemeWithTransition: () => void;
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

  const toggleThemeWithTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Create custom event to trigger eraser wipe animation
    const event = new CustomEvent('theme-wipe', {
      detail: {
        onMidpoint: () => {
          setDarkMode((prev) => !prev);
        },
        onComplete: () => {
          setIsTransitioning(false);
        },
      },
    });
    window.dispatchEvent(event);
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
