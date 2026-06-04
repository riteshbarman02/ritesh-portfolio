"use client";

import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import Footer from './Footer';

const AboutClientPage = () => {
  return (
    <main className="w-full min-h-screen bg-background text-text relative pb-10">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-32 flex flex-col gap-8 pb-20">
        
        {/* Back Button */}
        <Link 
          href="/#home"
          className="font-cursive font-bold text-lg py-1 px-4 border-2 border-border doodle-border-sm doodle-clickable hover:bg-primary/10 hover:text-primary transition duration-150 self-start inline-flex items-center gap-2 bg-background text-text-heading"
        >
          ← Back to Sketchbook 
        </Link>

        {/* Page Header */}
        <div className="text-center md:text-left flex flex-col gap-3">
          <h1 className="text-5xl font-bold font-cursive text-text-heading doodle-underline w-fit mx-auto md:mx-0">
            About Me 
          </h1>
          <p className="text-xl font-body text-text-subheading font-bold doodle-highlight w-max">
            ~ The person behind the code ~
          </p>
        </div>

        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Avatar & Quick Stats */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Doodle Profile Image */}
            <div className=" doodle-border doodle-shadow p-3  max-w-[280px] mx-auto lg:mx-0 hover:rotate-2 hover:scale-105 transition-all duration-200">
              <img 
                src="/svg/profile_doodle.png" 
                alt="Ritesh Barman Doodle Portrait" 
                className="w-full h-auto object-cover bg-[#fbf9f4]"
              />
              <p className="text-center font-cursive text-lg font-bold text-text-subheading mt-2">Self Portrait </p>
            </div>

            {/* Quick Info Sheet */}
            <div className="bg-background doodle-border-sm doodle-shadow p-6 bg-opacity-40 relative">
              <div className="absolute top-0 bottom-0 left-4 w-[2px] bg-red-400 opacity-20 pointer-events-none" />
              <div className="pl-6 flex flex-col gap-4">
                <h3 className="font-cursive text-2xl font-bold text-text-heading border-b border-dashed border-border/10 pb-2">
                  Quick Details 📌
                </h3>
                <ul className="flex flex-col gap-3 font-body text-base">
                  <li>
                    <span className="font-bold text-primary font-cursive text-lg">Role:</span> Web Developer
                  </li>
                  <li>
                    <span className="font-bold text-primary font-cursive text-lg">Focus:</span> Full Stack, AWS cloud , System Architecture & applications
                  </li>
                  <li>
                    <span className="font-bold text-primary font-cursive text-lg">Location:</span> Raipur, Chhattisgarh, India 🇮🇳
                  </li>
                  <li>
                    <span className="font-bold text-primary font-cursive text-lg">Status:</span> Dakshana Scholar
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Info Sections */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Bio Note */}
            <div className="bg-background doodle-notebook-page p-8 bg-opacity-40 relative">
              {/* Red margin line */}
              <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-red-400 opacity-20 pointer-events-none" />
              
              <div className="pl-8 flex flex-col gap-6">
                <h2 className="text-3xl font-bold font-cursive text-text-heading">
                  Hello, I'm Ritesh Barman
                </h2>
                
                <div className="font-body text-lg text-text flex flex-col gap-4 leading-relaxed">
                  <p>
                    I am a software developer with a strong passion for transforming creative ideas into clean, functional, and interactive digital interfaces. My programming journey is fueled by a desire to blend visual arts with logical structures. I specialize in front-end design, UI/UX systems, and building responsive single-page architectures.
                  </p>
                  <p>
                    As a <span className="doodle-highlight font-bold text-primary">Dakshana Scholar</span>, I was selected through an intense national scholarship program designed to nurture academic potential. This background taught me discipline, problem-solving from first principles, and continuous technical refinement.
                  </p>
                </div>
              </div>
            </div>

            {/* Currently Working Section */}
            <div className="bg-background doodle-notebook-page p-8 bg-opacity-40 relative">
              <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-red-400 opacity-20 pointer-events-none" />
              
              <div className="pl-8 flex flex-col gap-4">
                <h2 className="text-3xl font-bold font-cursive text-text-heading">
                  Currently  Working 
                </h2>
                <div className="font-body text-lg text-text flex flex-col gap-4 leading-relaxed">
                  <p>
                    I am working as a <span className="font-bold text-primary doodle-highlight hover:cursor-pointer">Senior software developer at eigenstudio</span>. 
                  </p>
                  <p>
                    Eigen Studio builds <span className="font-bold text-primary doodle-highlight">AI-powered tools for core engineering</span>. In my role, I am responsible for designing, developing, and optimizing highly interactive web graphical user interfaces (GUIs), dashboards, and custom widgets. I collaborate closely with scientists and computational engineers to translate complex scientific data matrices into intuitive, high-fidelity browser representations.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-background doodle-notebook-page p-8 bg-opacity-40 relative">
              <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-red-400 opacity-20 pointer-events-none" />
              
              <div className="pl-8 flex flex-col gap-6">
                <h2 className="text-3xl font-bold font-cursive text-text-heading">
                  Experience Timeline 
                </h2>

                {/* Timeline item 1: Eigenstudio */}
                <div className="flex gap-4 items-start relative pl-4 border-l-2 border-dashed border-border/20 py-2">
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex flex-col gap-2 font-body text-text">
                    <span className="font-cursive text-xl font-bold text-text-heading">Senior Software Developer</span>
                    <span className="text-sm font-bold text-text-subheading doodle-highlight w-max">eigenstudio • Feb 2025 - Present</span>
                    <p className="text-base leading-relaxed mt-1">
                      Leading frontend and full-stack development of AI-powered tools for core engineering. Architecting cloud-native solutions, designing visual node-graph editors, and implementing responsive full-stack features with focus on performance, system architecture, and cloud deployment.
                    </p>
                  </div>
                </div>

                {/* Timeline item 2: Avkalan Labs */}
                <div className="flex gap-4 items-start relative pl-4 border-l-2 border-dashed border-border/20 py-2">
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-secondary bg-background flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  </div>
                  <div className="flex flex-col gap-2 font-body text-text">
                    <span className="font-cursive text-xl font-bold text-text-heading">Web Developer</span>
                    <span className="text-sm font-bold text-text-subheading w-max doodle-highlight ">Avkalan Labs • Jan 2024 - Jan 2025</span>
                    <p className="text-base leading-relaxed mt-1">
                      Designed and engineered interactive browser widgets and visual workflows for large-scale multi-physics solvers. Developed type-safe frontend APIs and real-time visualization dashboards to display high-fidelity computational outputs, significantly enhancing interface performance and scientist collaboration.
                    </p>
                  </div>
                </div>

                {/* Timeline item 3: Internship */}
                <div className="flex gap-4 items-start relative pl-4 border-l-2 border-dashed border-border/20 py-2">
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-border bg-background flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                  </div>
                  <div className="flex flex-col gap-2 font-body text-text">
                    <span className="font-cursive text-xl font-bold text-text-heading">Software Engineering Intern</span>
                    <span className="text-sm font-bold text-text-subheading w-max doodle-highlight">eigenplus • Mid 2023 - Dec 2023</span>
                    <p className="text-base leading-relaxed mt-1">
                      Contributed to the restructuring and migration of legacy web systems into modern single-page Next.js frameworks. Developed modular dashboard UI elements, wrote extensive unit tests, and audited styling layouts for cross-device mobile consistency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-background doodle-notebook-page p-8 bg-opacity-40 relative">
              <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-red-400 opacity-20 pointer-events-none" />
              
              <div className="pl-8 flex flex-col gap-6">
                <h2 className="text-3xl font-bold font-cursive text-text-heading">
                  Education Background 🎓
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  
                  {/* College Note */}
                  <div className="border-2 border-border doodle-border-sm p-4 bg-background bg-opacity-20 flex flex-col gap-3 hover:-rotate-1 transition-transform duration-200">
                    <h3 className="font-cursive text-2xl font-bold text-text-heading border-b border-dashed border-border/10 pb-1">
                      College Studies 
                    </h3>
                    <div className="font-body text-base text-text flex flex-col gap-2">
                      <span className="font-bold text-text-heading">Government College of Engineering and Research</span>
                      <span className="text-sm text-text-subheading font-bold">Raipur, Chhattisgarh, India</span>
                      <span className="text-sm text-text-subheading">Bachelor of Technology (B.Tech.)</span>
                      <div className="mt-2 py-1 px-3 border border-dashed border-primary/20 bg-primary/5 rounded w-fit">
                        <span className="font-cursive text-lg font-bold text-primary">CGPA: 7.94</span>
                      </div>
                    </div>
                  </div>

                  {/* Schooling Note */}
                  <div className="border-2 border-border doodle-border-sm p-4 bg-background bg-opacity-20 flex flex-col gap-3 hover:rotate-1 transition-transform duration-200">
                    <h3 className="font-cursive text-2xl font-bold text-text-heading border-b border-dashed border-border/10 pb-1">
                      School Days 
                    </h3>
                    <div className="font-body text-base text-text flex flex-col gap-2">
                      <span className="font-bold text-text-heading">Jawahar Navodaya Vidyalaya (JNV)</span>
                      <span className="text-sm text-text-subheading font-bold">Korba, Chhattisgarh</span>
                      <span className="text-sm text-text-subheading">Class of 2019 (12th Batch)</span>
                      
                      <div className="flex flex-col gap-1.5 mt-2">
                        <div className="py-0.5 px-3 border border-dashed border-secondary/20 bg-secondary/5 rounded w-fit">
                          <span className="font-cursive text-base font-bold text-secondary">Class 12th: 89%</span>
                        </div>
                        <div className="py-0.5 px-3 border border-dashed border-secondary/20 bg-secondary/5 rounded w-fit">
                          <span className="font-cursive text-base font-bold text-secondary">Class 10th: 9.4 CGPA</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Social Footer */}
      <Footer />
    </main>
  );
};

export default AboutClientPage;
