import React, { useContext } from 'react';
import { ContentContext } from '../../context/ContentContext';
import ProjectCard from '../ui/ProjectCards';
import { div } from 'three/tsl';

const ProjectList = () => {
  const { projects } = useContext(ContentContext);

  if (!projects || projects.length === 0) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className='home w-full flex flex-col lg:flex-row justify-between bg-background text-text max-w-7xl mx-auto px-2 sm:px-6  px:2 flex-wrap items-center gap-8 lg:py-8'>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div key={index} className="col-span-1">
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProjectList;
