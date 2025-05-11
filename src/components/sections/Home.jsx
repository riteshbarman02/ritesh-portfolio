import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { ContentContext } from "../../context/ContentContext";
import Buttons from "../ui/Buttons";
import ThreeScene from "../ui/ThreeScene";
import GlowBackground from "../ui/GlowBackground";

const Home = () => {
  const content = useContext(ContentContext);
  const home = content.home;

  if (!home) return <p>Loading...</p>;

  return (
    <section className="home pt-16 w-full flex flex-col lg:flex-row justify-between bg-background text-text max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 gap-6">
      {/* Text content */}
      <div className="home-content flex-1 self-center py-25 flex flex-col gap-6 max-w-2xl ">
        <h1 className="font-bold text-4xl sm:text-5xl flex flex-wrap gap-2 text-white">
  {`Hi, I am ${home.metadata.name}`.split(" ").map((word, i) => (
    <span
      key={i}
      className="animate-word-fade inline-block"
      style={{ animationDelay: `${i * 0.2}s` }}
    >
      <span className={word === home.metadata.name ? "text-white" : ""}>{word}</span>
    </span>
  ))}
</h1>

        <h2 className="text-lg sm:text-xl">{home.metadata.profile}</h2>

        <ReactMarkdown >{home.body}</ReactMarkdown>

        <Buttons label="Resume" />
      </div>

      {/* 3D Section */}
      <section className="flex-1 p-4 flex">
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full">
          <GlowBackground />
          <ThreeScene />
        </div>
      </section>
    </section>
  );
};

export default Home;
