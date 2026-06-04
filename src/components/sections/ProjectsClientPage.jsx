"use client";

import React from 'react';
import Navbar from './Navbar';
import ProjectCard from '../ui/ProjectCards';
import Footer from './Footer';

const ProjectsClientPage = ({ projects }) => {
  return (
    <main className="w-full min-h-screen bg-background text-text relative pb-10">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-32 flex flex-col gap-10 pb-20">
        
        {/* Projects Header */}
        <div className="text-center md:text-left flex flex-col gap-3">
          <h1 className="text-5xl font-bold font-cursive text-text-heading doodle-underline w-fit mx-auto md:mx-0">
            My Projects 🚀
          </h1>
          <p className="text-xl font-body text-text-subheading font-bold">
            ~ A showcase of built creations, tools, and code repositories ~
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-background doodle-border-sm doodle-shadow">
            <p className="font-cursive text-2xl">No sketches here yet! Check back soon ✏s</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.slug} className="col-span-1">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default ProjectsClientPage;
