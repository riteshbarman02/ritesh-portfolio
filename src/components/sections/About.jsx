import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { ContentContext } from "../../context/ContentContext";
import Buttons from "../ui/Buttons";
import GlowBackground from "../ui/GlowBackground";

const About = () => {
  const content = useContext(ContentContext);
    const about = content.about;
  
    if (!about) return <p>Loading...</p>;
  return (

       <div className='home w-full flex flex-col justify-between bg-background text-text max-w-7xl mx-auto px-2 sm:px-6  px:2 flex-wrap  gap-8 lg:py-8'>
             <h2 className='text-3xl animate-word-fade font-medium  text-text-heading mb-8'>About</h2>
      <div className='home w-full flex flex-col lg:flex-row justify-between bg-background text-text max-w-7xl mx-auto px-2 sm:px-6  px:2 flex-wrap items-center gap-8 lg:py-8'>
          
      <div className=" flex relative">
       <GlowBackground/>
       <img className=" rounded-full aspect-square " src="svg/Me.svg" alt="" width="150px"  />
      </div>
      
      <div className="flex-1 flex flex-col gap-3" >
      
         <ReactMarkdown >{about.body}</ReactMarkdown>
      </div>
    </div>
    </div>

  )
}

export default About