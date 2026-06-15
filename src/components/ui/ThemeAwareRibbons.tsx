"use client";

import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Ribbons from "./Ribbons";

const ThemeAwareRibbons = () => {
  const { darkMode } = useTheme();

  // Color selection:
  // - Light mode (Sketchbook): Dark graphite ribbon trail
  // - Dark mode (Blackboard): Chalky white ribbon trail
  const ribbonColors = darkMode
    ? ["#f3f4f6"] // White chalk trail
    : ["#18181b"]; // Charcoal ink trail

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden w-full h-full"
      style={{ mixBlendMode: darkMode ? "screen" : "multiply" }}
    >
      <Ribbons
        baseThickness={8}
        colors={ribbonColors}
        speedMultiplier={0.65}
        maxAge={650}
        pointCount={60}
        baseSpring={0.035}
        baseFriction={0.88}
        offsetFactor={0.02}
        enableFade={true}
        enableShaderEffect={true}
        effectAmplitude={1.5}
      />
    </div>
  );
};

export default ThemeAwareRibbons;
