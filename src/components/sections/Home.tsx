import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ContentContext } from "../../context/ContentContext";
import Buttons from "../ui/Buttons";
import OrigamiWorkspace from "../ui/OrigamiWorkspace";

const VIDEO_SRC = "/make_an_background_video_on_st.mp4";
/** Seconds before end to start crossfade — effectively cuts the last 2s */
const FADE_BEFORE_END = 2;

const Home = () => {
  const content = useContext(ContentContext);
  const home = content.home;

  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // Two video refs for crossfade loop
  const vidA = useRef<HTMLVideoElement>(null);
  const vidB = useRef<HTMLVideoElement>(null);
  // Which video is currently "active" (visible)
  const activeRef = useRef<"A" | "B">("A");
  const fadingRef = useRef(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const a = vidA.current;
    const b = vidB.current;
    if (!a || !b) return;

    // Start both loaded; B is hidden initially
    a.style.opacity = "1";
    b.style.opacity = "0";

    const crossfade = (from: HTMLVideoElement, to: HTMLVideoElement) => {
      if (fadingRef.current) return;
      fadingRef.current = true;

      // Restart the incoming video at 0 so it begins fresh
      to.currentTime = 0;
      to.play().catch(() => {});

      // CSS transitions handle the opacity animation
      from.style.opacity = "0";
      to.style.opacity = "1";

      // After the crossfade duration, pause + reset the outgoing video
      setTimeout(() => {
        from.pause();
        from.currentTime = 0;
        fadingRef.current = false;
        activeRef.current = activeRef.current === "A" ? "B" : "A";
      }, 1800); // match transition duration in CSS
    };

    const onTimeUpdateA = () => {
      if (!a.duration) return;
      if (a.currentTime >= a.duration - FADE_BEFORE_END && activeRef.current === "A") {
        crossfade(a, b!);
      }
    };
    const onTimeUpdateB = () => {
      if (!b.duration) return;
      if (b.currentTime >= b.duration - FADE_BEFORE_END && activeRef.current === "B") {
        crossfade(b, a!);
      }
    };

    a.addEventListener("timeupdate", onTimeUpdateA);
    b.addEventListener("timeupdate", onTimeUpdateB);

    return () => {
      a.removeEventListener("timeupdate", onTimeUpdateA);
      b.removeEventListener("timeupdate", onTimeUpdateB);
    };
  }, []);

  if (!home) return <p className="text-center font-cursive text-2xl py-20">Loading Sketchbook...</p>;

  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResumeClick = () => {
    alert("Resume download coming soon! Hand-drawing it right now 📝");
  };

  return (
    <div className="home-video-wrapper">
      {/* Crossfade video pair — group holds intensity opacity; JS controls crossfade */}


      {/* Gradient overlay for readability */}
      <div className="home-video-overlay" aria-hidden="true" />

      <section className="w-full min-h-screen pt-24 pb-12 flex flex-col lg:flex-row justify-between items-center bg-transparent max-w-6xl mx-auto px-6 gap-10 relative z-10">
        {/* Text content */}
        <div className="flex-1 flex flex-col gap-6 max-w-2xl relative">
          <h1 className="font-bold text-5xl sm:text-6xl flex flex-wrap gap-2 text-text-heading font-cursive">
            {`Hi, I am ${home.metadata.name}`.split(" ").map((word, i) => (
              <span
                key={i}
                className="animate-word-fade inline-block"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span className={word === home.metadata.name ? "text-primary doodle-underline" : ""}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <h2 className="text-3xl text-text-subheading font-cursive font-bold">
            ~ {home.metadata.profile} ~
          </h2>

          <div className="bg-background doodle-border-sm doodle-shadow p-6 relative bg-opacity-40">
            {/* Notebook line decoration */}
            <div className="absolute top-0 bottom-0 left-4 w-[2px] bg-red-400 opacity-30 pointer-events-none" />
            <div className="pl-6 font-body text-lg text-text">
              <ReactMarkdown>{home.body}</ReactMarkdown>
            </div>
          </div>

          <div className="flex gap-4 sm:w-2/3">
            <Buttons label="Resume" onClick={handleResumeClick} />
            <Buttons label="Contact Me" onClick={handleContactClick} />
          </div>
        </div>

        {/* Origami 3D workspace */}
        {isLargeScreen && (
          <div className="flex-1 flex items-center justify-center p-4">
            <OrigamiWorkspace />
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
