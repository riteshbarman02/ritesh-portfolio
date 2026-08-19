import App from "../App";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Ritesh Barman - Interactive Sketchbook Portfolio",
  description:
    "Explore Ritesh Barman's interactive 3D portfolio and sketchbook. Senior Software Developer at eigenstudio & Dakshana Scholar specializing in full-stack web applications, visual node editors, and system architecture.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ritesh Barman | Senior Software Developer Portfolio & Sketchbook",
    description:
      "Interactive 3D workspace, web projects, and software engineering insights by Ritesh Barman.",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ritesh Barman | Senior Software Developer Portfolio & Interactive Sketchbook",
      },
    ],
  },
};

export default function Page() {
  return <App />;
}

