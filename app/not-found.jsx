"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../src/components/sections/Navbar';
import Link from 'next/link';

export default function NotFound() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  return (
    <main className="w-full min-h-screen bg-background text-text flex flex-col items-center justify-center p-6 text-center">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="bg-background doodle-border doodle-shadow p-8 max-w-md bg-opacity-40 mt-20">
        <h1 className="text-6xl font-bold font-cursive text-text-heading mb-4">404 📭</h1>
        <h2 className="text-2xl font-bold font-cursive text-text-subheading mb-4">Page Not Found</h2>
        <p className="font-body mb-6 leading-relaxed">
          The page you are looking for has either been erased, or it was never sketched in our sketchbook!
        </p>
        <Link 
          href="/#home"
          className="font-cursive font-bold text-lg py-2 px-6 border-2 border-border doodle-border-sm doodle-clickable hover:bg-primary/10 hover:text-primary transition duration-150 inline-block bg-background text-text-heading"
        >
          Go Back Home 🏠
        </Link>
      </div>
    </main>
  );
}
