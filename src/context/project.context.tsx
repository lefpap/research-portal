import type { CollectionEntry } from "astro:content";
import { createContext, useState } from "react";

export interface ProjectItem {
  project: CollectionEntry<"projects">;
  authors: CollectionEntry<"authors">[];
}

export interface ProjectContextState {
  initialProjectItems: ProjectItem[];
  projectItems: ProjectItem[];
  authors: CollectionEntry<"authors">[];
  tags: string[];
  setProjectItems: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
}

export const ProjectContext = createContext<ProjectContextState | undefined>(
  undefined,
);

export interface ProjectProviderProps {
  initialProjectItems: ProjectItem[];
  authors: CollectionEntry<"authors">[];
  tags: string[];
  children: React.ReactNode;
}

export function ProjectProvider({
  initialProjectItems,
  authors,
  tags,
  children,
}: ProjectProviderProps) {
  const [projectItems, setProjectItems] =
    useState<ProjectItem[]>(initialProjectItems);

  return (
    <ProjectContext.Provider
      value={{
        initialProjectItems,
        authors,
        projectItems,
        tags,
        setProjectItems,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
