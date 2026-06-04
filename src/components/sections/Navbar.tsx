"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [

    { text: "About", href: "/about" },
    { text: "Projects", href: "/projects" },
    { text: "Contact", href: "/#contact" },
    { text: "Blog", href: "/blog" }
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 bg-background doodle-border-sm doodle-shadow px-6 py-2 flex items-center justify-between transition-colors duration-300">
      {/* Logo */}
      <Link href="/#home" className="text-3xl font-bold text-text-heading font-cursive hover:scale-105 hover:-rotate-2 transition-transform duration-150">
        R<span className="text-primary font-cursive">B</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center space-x-6">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="font-cursive text-xl font-bold text-text-heading px-3 py-1 rounded transition-all duration-150 hover:-rotate-2 hover:scale-105 hover:bg-primary/10 hover:text-primary"
          >
            {link.text}
          </Link>
        ))}
      </nav>

      {/* Control Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-text-heading p-2 rounded-full border-2 border-border doodle-clickable bg-transparent flex items-center justify-center cursor-pointer"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-text-heading p-2 rounded-full border-2 border-border doodle-clickable" onClick={toggleMenu}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background doodle-border-sm doodle-shadow p-4 lg:hidden flex flex-col gap-2">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-cursive text-xl font-bold text-text-heading px-3 py-2 rounded transition duration-150 hover:bg-primary/10 hover:text-primary"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
