"use client";

import React, { useState } from "react";

const OrigamiWorkspace = () => {
  const [hovered, setHovered] = useState(false);

  // Transition durations and delays
  // Closed -> Open (Hover = true):
  // 1. Box flaps open immediately (delay 0s, duration 0.5s)
  // 2. Pop-up items rise (delay 0.3s, duration 0.5s)
  // Open -> Closed (Hover = false):
  // 1. Pop-up items sink immediately (delay 0s, duration 0.4s)
  // 2. Box flaps close (delay 0.3s, duration 0.5s)
  
  const getPanelStyle = (origin, closedTransform, openTransform) => ({
    position: "absolute",
    transformOrigin: origin,
    transform: hovered ? openTransform : closedTransform,
    transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
    transitionDelay: hovered ? "0s" : "0.2s",
    backfaceVisibility: "visible",
  });

  const getPopupStyle = (closedTransform, openTransform, additionalDelay = 0) => ({
    position: "absolute",
    transform: hovered ? openTransform : closedTransform,
    transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease",
    transitionDelay: hovered ? `${0.25 + additionalDelay}s` : "0s",
    opacity: hovered ? 1 : 0,
    pointerEvents: hovered ? "auto" : "none",
  });

  return (
    <div
      className="w-[300px] h-[300px] relative select-none cursor-pointer flex items-center justify-center perspective-[1200px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      {/* Instructions Overlay */}
      <div className={`absolute top-0 text-center font-cursive text-sm transition-opacity duration-300 pointer-events-none ${hovered ? "opacity-0" : "opacity-100 animate-pulse"}`}>
        ✨ Hover or Tap to Unfold Workspace ✨
      </div>

      {/* 3D Isometric Stage */}
      <div
        className="w-[140px] h-[140px] relative transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: hovered
            ? "rotateX(58deg) rotateZ(-35deg) scale(1.15) translateY(20px)"
            : "rotateX(55deg) rotateZ(-45deg)",
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
            className="w-[100px] h-[75px] left-[20px] top-[20px] bg-background doodle-border-sm doodle-shadow flex flex-col overflow-hidden"
            style={getPopupStyle(
              "rotateX(-90deg) translateZ(0px) scaleY(0)",
              "rotateX(-90deg) translateZ(55px) scaleY(1)"
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
            className="w-[30px] h-[35px] left-[-5px] top-[55px] bg-[#fca5a5] dark:bg-[#dc2626] border-2 border-border doodle-border-sm flex items-center justify-center text-lg select-none"
            style={getPopupStyle(
              "rotateY(-90deg) translateZ(0px) scaleX(0)",
              "rotateY(-90deg) translateZ(25px) scaleX(1)",
              0.05
            )}
          >
            ☕
            {/* Handle */}
            <div className="absolute -left-2.5 top-2.5 w-3 h-4 border-2 border-border rounded-l-full bg-background" />
          </div>

          {/* 3. Right side: Skills Cards (React, JS, Node badges) */}
          <div
            className="w-[45px] h-[45px] right-[-5px] top-[40px] bg-background border-2 border-border doodle-border-sm p-1 flex flex-col items-center justify-center font-cursive text-center"
            style={getPopupStyle(
              "rotateY(90deg) translateZ(0px) scaleX(0)",
              "rotateY(90deg) translateZ(25px) scaleX(1)",
              0.1
            )}
          >
            <span className="text-[10px] font-bold text-secondary">React Atom</span>
            <div className="text-xl animate-spin" style={{ animationDuration: '6s' }}>⚛️</div>
          </div>
          
          <div
            className="w-[35px] h-[35px] right-[25px] top-[-15px] bg-background border-2 border-border doodle-border-sm flex items-center justify-center text-xl"
            style={getPopupStyle(
              "rotateX(-90deg) translateZ(0px) scaleY(0)",
              "rotateX(-90deg) translateZ(35px) scaleY(1)",
              0.15
            )}
          >
            🟨
            <span className="absolute text-[8px] font-bold text-zinc-950">JS</span>
          </div>

          {/* ==================== BOX FLAPS (Unfold outwards) ==================== */}

          {/* A. LEFT PANEL (Top boundary of Base, folds up/down) */}
          <div
            className="w-[140px] h-[100px] left-0 bg-[#deb887] dark:bg-zinc-800 border-2 border-border doodle-border-sm"
            style={{
              ...getPanelStyle(
                "bottom",
                "rotateX(90deg)",
                "rotateX(0deg) translateY(-100px)"
              ),
              bottom: "140px",
            }}
          >
            {/* Box Inner Detail */}
            <div className="w-full h-full flex flex-col justify-end p-2 select-none border-t border-dashed border-border/10">
              <span className="font-cursive text-xs font-bold text-border/40 select-none">INNER FLAP A</span>
            </div>
            
            {/* Lid sub-flap */}
            <div
              className="absolute left-0 right-0 h-[80px] bg-[#d2a679] dark:bg-zinc-700 border-2 border-border doodle-border-sm"
              style={{
                position: "absolute",
                bottom: "100px",
                transformOrigin: "bottom",
                transform: hovered ? "rotateX(0deg)" : "rotateX(-90deg)",
                transition: "transform 0.5s ease",
                transitionDelay: hovered ? "0.05s" : "0.15s",
              }}
            >
              <div className="p-2 font-cursive text-[10px] font-bold text-center leading-none text-text">
                📦 Handle with Care
              </div>
            </div>
          </div>

          {/* B. RIGHT PANEL (Bottom boundary of Base, folds up/down) */}
          <div
            className="w-[140px] h-[100px] left-0 bg-[#deb887] dark:bg-zinc-800 border-2 border-border doodle-border-sm"
            style={{
              ...getPanelStyle(
                "top",
                "rotateX(-90deg)",
                "rotateX(0deg) translateY(100px)"
              ),
              top: "140px",
            }}
          >
            <div className="w-full h-full flex flex-col justify-start p-2 border-b border-dashed border-border/10">
              <span className="font-cursive text-xs font-bold text-border/40 select-none">INNER FLAP B</span>
            </div>

            {/* Lid sub-flap */}
            <div
              className="absolute left-0 right-0 h-[80px] bg-[#d2a679] dark:bg-zinc-700 border-2 border-border doodle-border-sm"
              style={{
                position: "absolute",
                top: "100px",
                transformOrigin: "top",
                transform: hovered ? "rotateX(0deg)" : "rotateX(90deg)",
                transition: "transform 0.5s ease",
                transitionDelay: hovered ? "0.05s" : "0.15s",
              }}
            >
              <div className="p-2 font-cursive text-[10px] font-bold text-center leading-none text-text">
                📝 Worksheets Inside
              </div>
            </div>
          </div>

          {/* C. BACK PANEL (Left boundary of Base, folds left/right) */}
          <div
            className="w-[100px] h-[140px] top-0 bg-[#c69c6d] dark:bg-zinc-900 border-2 border-border doodle-border-sm"
            style={{
              ...getPanelStyle(
                "right",
                "rotateY(-90deg)",
                "rotateY(0deg) translateX(-100px)"
              ),
              right: "140px",
            }}
          >
            <div className="w-full h-full flex items-center justify-center p-2 [writing-mode:vertical-lr] text-center font-cursive text-sm text-text-heading font-bold select-none rotate-180">
              RITESH'S LAB 🔬
            </div>
          </div>

          {/* D. FRONT PANEL (Right boundary of Base, folds left/right) */}
          <div
            className="w-[100px] h-[140px] top-0 bg-[#c69c6d] dark:bg-zinc-900 border-2 border-border doodle-border-sm"
            style={{
              ...getPanelStyle(
                "left",
                "rotateY(90deg)",
                "rotateY(0deg) translateX(100px)"
              ),
              left: "140px",
            }}
          >
            {/* Box Outer marker text - visible when closed */}
            <div className="w-full h-full flex items-center justify-center p-2 [writing-mode:vertical-lr] text-center font-cursive text-sm text-text-heading font-bold select-none">
              FRAGILE 📦
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrigamiWorkspace;
