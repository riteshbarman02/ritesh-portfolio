"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const OrigamiWorkspace = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [rotX, setRotX] = useState(58);
  const [rotZ, setRotZ] = useState(-35);
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 58, rotZ: -35 });
  const hasDraggedRef = useRef(false);

  // Reset rotation when box closes
  useEffect(() => {
    if (!hovered) {
      setRotX(58);
      setRotZ(-35);
      setIsDragging(false);
    }
  }, [hovered]);

  // Orbit controls drag listener
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      let cx = 0;
      let cy = 0;
      
      if ("touches" in e && e.touches.length) {
        cx = e.touches[0].clientX;
        cy = e.touches[0].clientY;
      } else if ("clientX" in e) {
        cx = e.clientX;
        cy = e.clientY;
      } else {
        return;
      }

      const dx = cx - dragStartRef.current.x;
      const dy = cy - dragStartRef.current.y;

      if (Math.hypot(dx, dy) > 5) {
        hasDraggedRef.current = true;
      }

      // Calculate new angles
      const newRotZ = dragStartRef.current.rotZ - dx * 0.5;
      const newRotX = Math.max(25, Math.min(85, dragStartRef.current.rotX - dy * 0.5));

      setRotZ(newRotZ);
      setRotX(newRotX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleStartDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!hovered) return; // Only enable orbit controls when open!
    
    const clientX = "touches" in e 
      ? e.touches[0].clientX 
      : e.clientY; // Wait, wait: e.clientX! Let's check: clientX should be e.clientX in MouseEvent
    const clientY = "touches" in e 
      ? e.touches[0].clientY 
      : e.clientY;
      
    // Let's get starting coords correctly
    const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
    const cy = "touches" in e ? e.touches[0].clientY : e.clientY;

    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: cx,
      y: cy,
      rotX,
      rotZ
    };
  };

  const handleFaceClick = (path: string) => (e: React.MouseEvent) => {
    if (!hovered) return;
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    
    if (path.startsWith("/#")) {
      const hash = path.substring(2);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(path);
  };

  // Transition durations and delays
  // Closed -> Open (Hover = true):
  // 1. Box flaps open immediately (delay 0s, duration 0.5s)
  // 2. Pop-up items rise (delay 0.3s, duration 0.5s)
  // Open -> Closed (Hover = false):
  // 1. Pop-up items sink immediately (delay 0s, duration 0.4s)
  // 2. Box flaps close (delay 0.3s, duration 0.5s)
  
  const getPanelStyle = (
    origin: string,
    closedTransform: string,
    openTransform: string
  ): React.CSSProperties => ({
    position: "absolute",
    transformOrigin: origin,
    transform: hovered ? openTransform : closedTransform,
    transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.45s ease, border-color 0.45s ease",
    transitionDelay: hovered ? "0s" : "0.2s",
    backfaceVisibility: "visible",
  });

  const getPopupStyle = (
    origin: string,
    closedTransform: string,
    openTransform: string,
    additionalDelay = 0
  ): React.CSSProperties => ({
    position: "absolute",
    transformOrigin: origin,
    transform: hovered ? openTransform : closedTransform,
    transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease, background-color 0.45s ease, border-color 0.45s ease",
    transitionDelay: hovered ? `${0.25 + additionalDelay}s` : "0s",
    opacity: hovered ? 1 : 0,
    pointerEvents: hovered ? "auto" : "none",
    transformStyle: "preserve-3d",
  });

  return (
    <div
      className={`w-[300px] h-[300px] relative select-none flex items-center justify-center perspective-[1200px] ${hovered ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-pointer'}`}
      onMouseEnter={() => { if (!isDragging) setHovered(true); }}
      onMouseLeave={() => { if (!isDragging) setHovered(false); }}
      onMouseDown={handleStartDrag}
      onTouchStart={handleStartDrag}
      onClick={(e) => {
        if (hasDraggedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        setHovered(!hovered);
      }}
    >
      {/* Instructions Overlay */}
      <div className={`absolute top-0 text-center font-cursive text-sm transition-opacity duration-300 pointer-events-none ${hovered ? "opacity-0" : "opacity-100 animate-pulse"}`}>
        ✨ Hover or Tap to Unfold Workspace ✨
      </div>

      {/* 3D Isometric Stage */}
      <div
        className="w-[140px] h-[140px] relative"
        style={{
          transformStyle: "preserve-3d",
          transform: hovered
            ? `rotateX(${rotX}deg) rotateZ(${rotZ}deg) scale(1.15) translateY(20px)`
            : "rotateX(55deg) rotateZ(-45deg)",
          transition: isDragging
            ? "transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1)"
            : "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* ==================== BOX BASE (Bottom Face) ==================== */}
        <div
          className="absolute inset-0 bg-[#e8dcc4] doodle-border-sm transition-colors duration-300"
          style={{
            transformStyle: "preserve-3d",
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          {/* Ruled lines inside cardboard bottom */}
          <div className="absolute inset-2 border border-dashed border-border/20 flex flex-col justify-around p-1">
            <div className="h-[2px] bg-border/10 w-full" />
            <div className="h-[2px] bg-border/10 w-full" />
            <div className="h-[2px] bg-border/10 w-full" />
          </div>

          {/* ==================== POP-UP ELEMENTS (Stands upright inside) ==================== */}
          
          {/* 1. Center Coding Screen Monitor */}
          <div
            onClick={handleFaceClick("/projects")}
            className="w-[100px] h-[75px] left-[20px] top-[20px] bg-background doodle-border-sm doodle-shadow flex flex-col overflow-hidden hover:border-primary cursor-pointer transition-colors duration-150"
            style={getPopupStyle(
              "bottom",
              "rotateX(-90deg) scaleY(0)",
              "rotateX(-90deg) scaleY(1)"
            )}
          >
            {/* Monitor Header */}
            <div className="h-4 border-b-2 border-border bg-primary/10 flex items-center px-1 gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            </div>
            {/* Monitor Code Body */}
            <div className="p-1.5 font-mono text-[6px] text-primary flex flex-col gap-1 leading-none select-none">
              <div className="text-secondary font-bold">class Portfolio extends Dev {"{"}</div>
              <div className="pl-2 text-text-subheading">constructor() {"{"}</div>
              <div className="pl-4 text-text font-bold">this.skills = ["React", "JS"];</div>
              <div className="pl-2 text-text-subheading">{"}"}</div>
              <div className="text-secondary">{"}"}</div>
            </div>
            <div className="absolute bottom-1 right-2 text-[9px] font-cursive font-bold text-text-subheading animate-pulse">
              💻
            </div>
          </div>

          {/* 2. Left side: Coffee Mug */}
          <div
            onClick={handleFaceClick("/#contact")}
            className="w-[30px] h-[35px] left-[-5px] top-[55px] bg-primary border-2 border-border doodle-border-sm flex items-center justify-center text-lg select-none transition-colors duration-300 hover:border-secondary cursor-pointer"
            style={getPopupStyle(
              "right",
              "rotateY(-90deg) scaleX(0)",
              "rotateY(-90deg) scaleX(1)",
              0.05
            )}
          >
            ☕
            {/* Handle */}
            <div className="absolute -left-2.5 top-2.5 w-3 h-4 border-2 border-border rounded-l-full bg-background" />
          </div>

          {/* 3. Right side: Skills Cards (React, JS, Node badges) */}
          <div
            onClick={handleFaceClick("/about")}
            className="w-[45px] h-[45px] right-[-5px] top-[40px] bg-background border-2 border-border doodle-border-sm p-1 flex flex-col items-center justify-center font-cursive text-center hover:border-primary cursor-pointer"
            style={getPopupStyle(
              "left",
              "rotateY(90deg) scaleX(0)",
              "rotateY(90deg) scaleX(1)",
              0.1
            )}
          >
            <span className="text-[10px] font-bold text-secondary font-cursive">React Atom</span>
            <div className="text-xl animate-spin" style={{ animationDuration: '6s' }}>⚛️</div>
          </div>
          
          <div
            onClick={handleFaceClick("/about")}
            className="w-[35px] h-[35px] right-[25px] top-[-15px] bg-background border-2 border-border doodle-border-sm flex items-center justify-center text-xl hover:border-primary cursor-pointer"
            style={getPopupStyle(
              "bottom",
              "rotateX(-90deg) scaleY(0)",
              "rotateX(-90deg) scaleY(1)",
              0.15
            )}
          >
            🟨
            <span className="absolute text-[8px] font-bold text-zinc-950 font-cursive">JS</span>
          </div>

          {/* ==================== BOX FLAPS (Unfold outwards) ==================== */}

          {/* A. LEFT PANEL (Top boundary of Base, folds up/down) -> About Page */}
          <div
            className={`w-[140px] h-[100px] left-0 border-2 border-border doodle-border-sm transition-all duration-300 ${hovered ? "cursor-pointer hover:border-primary hover:brightness-110" : ""}`}
            onClick={handleFaceClick("/about")}
            style={{
              ...getPanelStyle(
                "bottom",
                "rotateX(90deg)",
                "rotateX(0deg) translateY(-100px)"
              ),
              bottom: "140px",
              backgroundColor: "var(--color-flap-bg)"
            }}
          >
            {/* Box Inner Detail */}
            <div className="w-full h-full flex flex-col justify-end p-2 select-none border-t border-dashed border-border/10">
              <span className="font-cursive text-xs font-bold text-white/60 select-none">ABOUT ME 👤</span>
            </div>
            
            {/* Lid sub-flap */}
            <div
              className="absolute left-0 right-0 h-[80px] border-2 border-border doodle-border-sm transition-colors duration-300"
              style={{
                position: "absolute",
                bottom: "100px",
                transformOrigin: "bottom",
                transform: hovered ? "rotateX(0deg)" : "rotateX(-90deg)",
                transition: "transform 0.5s ease, background-color 0.45s ease, border-color 0.45s ease",
                transitionDelay: hovered ? "0.05s" : "0.15s",
                backgroundColor: "var(--color-flap-sub)"
              }}
            >
              <div className="p-2 font-cursive text-[10px] font-bold text-center leading-none text-white">
                Who is Ritesh?
              </div>
            </div>
          </div>

          {/* B. RIGHT PANEL (Bottom boundary of Base, folds up/down) -> Projects Page */}
          <div
            className={`w-[140px] h-[100px] left-0 border-2 border-border doodle-border-sm transition-all duration-300 ${hovered ? "cursor-pointer hover:border-primary hover:brightness-110" : ""}`}
            onClick={handleFaceClick("/projects")}
            style={{
              ...getPanelStyle(
                "top",
                "rotateX(-90deg)",
                "rotateX(0deg) translateY(100px)"
              ),
              top: "140px",
              backgroundColor: "var(--color-flap-bg)"
            }}
          >
            <div className="w-full h-full flex flex-col justify-start p-2 border-b border-dashed border-border/10">
              <span className="font-cursive text-xs font-bold text-white/60 select-none">MY PROJECTS 💻</span>
            </div>

            {/* Lid sub-flap */}
            <div
              className="absolute left-0 right-0 h-[80px] border-2 border-border doodle-border-sm transition-colors duration-300"
              style={{
                position: "absolute",
                top: "100px",
                transformOrigin: "top",
                transform: hovered ? "rotateX(0deg)" : "rotateX(90deg)",
                transition: "transform 0.5s ease, background-color 0.45s ease, border-color 0.45s ease",
                transitionDelay: hovered ? "0.05s" : "0.15s",
                backgroundColor: "var(--color-flap-sub)"
              }}
            >
              <div className="p-2 font-cursive text-[10px] font-bold text-center leading-none text-white">
                Explore My Work
              </div>
            </div>
          </div>

          {/* C. BACK PANEL (Left boundary of Base, folds left/right) -> Contact Section */}
          <div
            className={`w-[100px] h-[140px] top-0 border-2 border-border doodle-border-sm transition-all duration-300 ${hovered ? "cursor-pointer hover:border-primary hover:brightness-110" : ""}`}
            onClick={handleFaceClick("/#contact")}
            style={{
              ...getPanelStyle(
                "right",
                "rotateY(-90deg)",
                "rotateY(0deg) translateX(-100px)"
              ),
              right: "140px",
              backgroundColor: "var(--color-flap-side)"
            }}
          >
            <div className="w-full h-full flex items-center justify-center p-2 [writing-mode:vertical-lr] text-center font-cursive text-sm text-white font-bold select-none rotate-180">
              SAY HELLO ✉️
            </div>
          </div>

          {/* D. FRONT PANEL (Right boundary of Base, folds left/right) -> Blog Page */}
          <div
            className={`w-[100px] h-[140px] top-0 border-2 border-border doodle-border-sm transition-all duration-300 ${hovered ? "cursor-pointer hover:border-primary hover:brightness-110" : ""}`}
            onClick={handleFaceClick("/blog")}
            style={{
              ...getPanelStyle(
                "left",
                "rotateY(90deg)",
                "rotateY(0deg) translateX(100px)"
              ),
              left: "140px",
              backgroundColor: "var(--color-flap-side)"
            }}
          >
            {/* Box Outer marker text - visible when closed */}
            <div className="w-full h-full flex items-center justify-center p-2 [writing-mode:vertical-lr] text-center font-cursive text-sm text-white font-bold select-none">
              READ BLOG 📝
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrigamiWorkspace;
