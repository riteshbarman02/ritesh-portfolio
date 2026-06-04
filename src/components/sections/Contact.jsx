import React, { useState } from 'react';
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setStatus('Thank you! I will get back to you soon. 💌');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-text flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12">
        
        {/* Left Section: Details */}
        <div className="flex flex-col gap-6 justify-center">
          <div>
            <h2 className="text-4xl font-bold font-cursive text-text-heading doodle-underline w-fit mb-6">
              Contact Me ✉️
            </h2>
            <p className="text-lg font-body mb-6 text-text leading-relaxed">
              "Let's build something great together." — Reach out for collaborations, questions, or just to say hi! I'm always open to new sketches and coding adventures.
            </p>
          </div>

          <div className="flex gap-4 text-3xl mt-2">
            <a 
              href="https://github.com/riteshbarman02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border-2 border-border doodle-border-sm doodle-clickable hover:text-primary hover:border-primary transition bg-background"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/ritesbarman02/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border-2 border-border doodle-border-sm doodle-clickable hover:text-primary hover:border-primary transition bg-background"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://instagram.com/rites_02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border-2 border-border doodle-border-sm doodle-clickable hover:text-primary hover:border-primary transition bg-background"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="mailto:ritesbarman02@gmail.com"
              className="p-3 border-2 border-border doodle-border-sm doodle-clickable hover:text-primary hover:border-primary transition bg-background"
              title="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Right Section: Form Container */}
        <div className="bg-background doodle-border doodle-shadow-lg p-8 relative bg-opacity-40">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 bg-background border-2 border-border doodle-border-sm placeholder-text/50 focus:outline-none focus:border-primary text-text-heading font-body"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 bg-background border-2 border-border doodle-border-sm placeholder-text/50 focus:outline-none focus:border-primary text-text-heading font-body"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="p-3 bg-background border-2 border-border doodle-border-sm placeholder-text/50 focus:outline-none focus:border-primary text-text-heading font-body resize-none"
            ></textarea>
            <button
              type="submit"
              className="mt-2 font-cursive text-xl font-bold py-3 px-6 bg-background doodle-border-sm doodle-shadow doodle-clickable text-text-heading hover:text-primary hover:border-primary active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0px_0px_var(--color-border)] cursor-pointer select-none"
            >
              Send Letter 📮
            </button>
          </form>
          {status && <p className="mt-4 text-green-600 font-bold text-center font-cursive text-xl">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;

