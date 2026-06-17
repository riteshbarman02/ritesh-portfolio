import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { ContentContext } from "../../context/ContentContext";

const About = () => {
  const { about } = useContext(ContentContext);

  if (!about) return <p className="text-center font-cursive text-2xl py-10">Loading About Section...</p>;

  const { metadata, body } = about;
  const skills = (metadata?.skills as string[]) || [];

  return (
    <div className='w-full flex flex-col justify-between bg-transparent text-text max-w-6xl mx-auto px-6 gap-8'>
      <h2 className='text-4xl font-bold font-cursive text-text-heading doodle-underline w-fit'>
        About Me 
      </h2>

      <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mt-4'>
        {/* Profile Image with Doodle Border */}
        <div className="relative p-2 bg-background doodle-border doodle-shadow rotate-0 hover:rotate-3 hover:scale-105 transition-all duration-200 max-w-[200px]">
 <img
  className="w-full h-auto object-cover doodle-profile-img rounded-md"
  style={{ transform: "scaleX(-1)" }}
  src="svg/image.png"
  alt="Ritesh Barman"
/>
        </div>

        {/* About Description + Skills wrapped in notebook sheet */}
        <div className="flex-1 flex flex-col gap-6 bg-background doodle-border-sm doodle-shadow p-6 bg-opacity-40 relative">
          <div className="absolute top-0 bottom-0 left-4 w-[2px] bg-red-400 opacity-30 pointer-events-none" />
          <div className="pl-6 font-body text-lg text-text">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>

          {skills.length > 0 && (
            <div className="pl-6 mt-2">
              <h3 className="text-2xl font-bold font-cursive text-text-heading mb-3">My Skills 🛠️</h3>
              <ul className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <li
                    key={idx}
                    className="bg-background border-2 border-border doodle-border-sm text-sm font-bold text-text-heading px-3 py-1 hover:-rotate-3 hover:scale-105 hover:bg-secondary/10 hover:text-secondary transition-all duration-150 cursor-default select-none"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
