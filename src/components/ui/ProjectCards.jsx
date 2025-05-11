import React from 'react';

const ProjectCard = ({ title, date, tech, thumbnail, body }) => {
  // Convert date object to a string using toLocaleDateString
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className=" bg-white/5 backdrop-blur-xl shadow-lg min-w-2xs  rounded-lg border-1 overflow-hidden">
      <img src={thumbnail} alt={title} className="w-full aspect-[5/2] object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-text">{title}</h3>
        <p className="text-sm text-text">{formattedDate}</p>
        <p className="text-sm text-text mt-2">{tech}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
