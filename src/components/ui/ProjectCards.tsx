import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  date?: string;
  tech?: string;
  thumbnail?: string;
  link?: string;
  slug: string;
  description?: string;
}

const ProjectCard = ({ title, tech, thumbnail, slug, description }: ProjectCardProps) => {
  return (
    <div className="bg-background doodle-border-sm doodle-shadow doodle-clickable p-4 flex flex-col gap-4 bg-opacity-40 hover:-rotate-2 transition-all duration-200 h-full justify-between">
      <div>
        {/* Sketchy Thumbnail Border */}
        {thumbnail && (
          <div className="w-full aspect-[16/10] overflow-hidden doodle-border-sm bg-primary/5 mb-3">
            <img src={thumbnail} alt={title} className="w-full h-full" />
          </div>
        )}
        
        {/* Title Link */}
        <h3 className="text-2xl font-bold font-cursive text-text-heading hover:text-primary hover:scale-102 transition duration-150">
          <Link href={`/projects/${slug}/`}>
            {title}
          </Link>
        </h3>

        {/* Tech tags */}
        {tech && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tech.split(',').map((item, idx) => (
              <span 
                key={idx} 
                className="text-xs font-bold border border-border doodle-border-sm px-2 py-0.5 bg-background text-text-heading hover:-rotate-3 transition duration-100"
              >
                #{item.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Project Description */}
        <p className="text-sm font-body text-text mt-3">
          {description}
        </p>
      </div>

      {/* View Project Link button */}
      <Link 
        href={`/projects/${slug}/`}
        className="text-center font-cursive font-bold text-lg mt-2 py-1 px-4 border-2 border-border doodle-border-sm hover:bg-primary/10 hover:text-primary transition duration-150 self-start inline-block bg-background text-text-heading"
      >
        View Details 🔍
      </Link>
    </div>
  );
};

export default ProjectCard;
