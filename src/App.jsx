"use client";

import React from "react";
import Navbar from "./components/sections/Navbar";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { ContentProvider } from "./context/ContentContext";
const App = () => {
  return (
    <ContentProvider>
      <main className="w-full min-h-screen bg-background text-text relative box-border">
        <Navbar />

        <div className="w-full flex flex-col">
          <div id="home">
            <Home />
          </div>
          
          <div id="about" className="py-16 md:py-24 border-t-4 border-dashed border-border/10">
            <About />
          </div>

          <div id="projects" className="py-16 md:py-24 border-t-4 border-dashed border-border/10">
            <Projects />
          </div>

          <div id="contact" className="border-t-4 border-dashed border-border/10">
            <Contact />
          </div>
        </div>
        
        <Footer />
      </main>
    </ContentProvider>
  );
};

export default App;

