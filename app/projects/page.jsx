import React from 'react';
import { getSortedProjectsData } from '../../src/utils/project';
import ProjectsClientPage from '../../src/components/sections/ProjectsClientPage';

// Force static rendering for static export
export const dynamic = 'force-static';

export default function ProjectsPage() {
  const projects = getSortedProjectsData();
  return <ProjectsClientPage projects={projects} />;
}
