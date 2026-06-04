import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-background py-8 px-6 border-t-4 border-dashed border-border/10 flex flex-col items-center gap-6 select-none relative">
      {/* Red vertical margin binder line decoration */}
      <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-red-400 opacity-10 pointer-events-none" />

      {/* Social links grid */}
      <div className="flex flex-wrap gap-4 justify-center text-text-heading">
        <a 
          href="https://github.com/riteshbarman02" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 border-2 border-border doodle-border-sm doodle-shadow doodle-clickable bg-background hover:text-primary hover:border-primary flex items-center gap-2 font-cursive font-bold text-lg transition duration-150"
        >
          <Github size={18} /> GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/ritesbarman02/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 border-2 border-border doodle-border-sm doodle-shadow doodle-clickable bg-background hover:text-primary hover:border-primary flex items-center gap-2 font-cursive font-bold text-lg transition duration-150"
        >
          <Linkedin size={18} /> LinkedIn
        </a>
        <a 
          href="https://instagram.com/rites_02" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 border-2 border-border doodle-border-sm doodle-shadow doodle-clickable bg-background hover:text-primary hover:border-primary flex items-center gap-2 font-cursive font-bold text-lg transition duration-150"
        >
          <Instagram size={18} /> Instagram
        </a>
        <a 
          href="mailto:ritesbarman02@gmail.com"
          className="px-4 py-2 border-2 border-border doodle-border-sm doodle-shadow doodle-clickable bg-background hover:text-primary hover:border-primary flex items-center gap-2 font-cursive font-bold text-lg transition duration-150"
        >
          <Mail size={18} /> Gmail
        </a>
      </div>

      {/* Bottom text */}
      <div className="text-center font-cursive text-lg text-text-subheading font-bold flex flex-col gap-1 mt-2">
        <p>© {new Date().getFullYear()} Ritesh Barman.</p>
        <p className="text-sm text-text-subheading/60">Hand-sketched with ✏️ and 💻</p>
      </div>
    </footer>
  );
};

export default Footer;
