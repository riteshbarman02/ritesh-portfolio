import React, { useContext } from 'react';
import Link from 'next/link';
import { ContentContext } from '../../context/ContentContext';
import ProjectCard from '../ui/ProjectCards';

const ProjectList = () => {
  const { projects } = useContext(ContentContext);

  if (!projects || projects.length === 0) {
    return <p className="text-center font-cursive text-2xl py-10">Loading Projects...</p>;
  }

  return (
    <div className='w-full flex flex-col justify-between bg-transparent text-text max-w-6xl mx-auto px-6 gap-8'>
      <h2 className='text-4xl font-bold font-cursive text-text-heading doodle-underline w-fit mb-4'>
        My Projects 
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.slice(0, 3).map((project, index) => (
          <div key={index} className="col-span-1">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link 
          href="/projects"
          className="font-cursive font-bold text-xl py-3 px-8 border-3 border-border doodle-border-sm doodle-shadow doodle-clickable hover:bg-primary/10 hover:text-primary transition duration-150 inline-block bg-background text-text-heading"
        >
          See All Projects 🚀
        </Link>
      </div>
    </div>
  );
};

export default ProjectList;
