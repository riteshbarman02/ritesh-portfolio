import Navbar from "./components/sections/Navbar";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { ContentProvider } from "./context/ContentContext";
import React from "react";
import Separater from "./components/ui/Separater";

const App = () => {
  return (
    <ContentProvider>
      <main className="w-full h-screen bg-background flex flex-col items-center text-text gap-6">
        <Navbar />
        <Home />
        
        <About />
         <Separater/>
        <Projects />
         <Separater/>
        <Contact />
         <Separater/>
      </main>
    </ContentProvider>
  );
};

export default App;
