import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional: install lucide-react for icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full fixed top-0 z-50 bg-white/5 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">Logo</div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6 text-white">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </nav>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 text-white">
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Services</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
