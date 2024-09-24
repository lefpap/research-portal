import { defaultLang, type Lang } from "@/config/i18n.config";
import type { CollectionEntry } from "astro:content";
import { createContext, useMemo, useState } from "react";

export interface ProjectItem {
  project: CollectionEntry<"projects">;
  authors: CollectionEntry<"authors">[];
}

export interface ProjectContextState {
  initialProjectItems: ProjectItem[];
  projectItems: ProjectItem[];
  setProjectItems: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
  authors: CollectionEntry<"authors">[];
  tags: string[];
  lang: Lang;
}

export const ProjectContext = createContext<ProjectContextState | undefined>(
  undefined,
);

export interface ProjectProviderProps {
  initialProjectItems: ProjectItem[];
  lang?: Lang;
  children: React.ReactNode;
}

export function ProjectProvider({
  initialProjectItems,
  lang = defaultLang,
  children,
}: ProjectProviderProps) {
  const [projectItems, setProjectItems] =
    useState<ProjectItem[]>(initialProjectItems);

  // Memoized unique tags with case-insensitive sorting
  const uniqueTags = useMemo(() => {
    const allTags = initialProjectItems.flatMap(
      ({ project }) => project.data.tags || [],
    );
    const uniqueTags = Array.from(new Set(allTags))
      .filter((tag): tag is string => Boolean(tag))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    return uniqueTags;
  }, [initialProjectItems]);

  // Memoized unique authors sorted by slug (case-insensitive)
  const uniqueAuthors = useMemo(() => {
    const allAuthors = initialProjectItems.flatMap((item) => item.authors);
    const uniqueAuthors = Array.from(new Set(allAuthors.map((a) => a.id)))
      .map((id) => allAuthors.find((a) => a.id === id))
      .filter((author): author is CollectionEntry<"authors"> => !!author)
      .sort((a, b) =>
        a.slug.localeCompare(b.slug, undefined, { sensitivity: "base" }),
      );

    return uniqueAuthors;
  }, [initialProjectItems]);

  return (
    <ProjectContext.Provider
      value={{
        initialProjectItems,
        projectItems,
        setProjectItems,
        authors: uniqueAuthors,
        tags: uniqueTags,
        lang,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
