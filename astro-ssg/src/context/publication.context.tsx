import type { CollectionEntry } from "astro:content";
import { createContext, useState } from "react";

export type PublicationWithAuthors = CollectionEntry<"publications"> & {
  authors: CollectionEntry<"authors">[];
};

export interface PublicationContextState {
  initialPublications: PublicationWithAuthors[];
  publications: PublicationWithAuthors[];
  authors: CollectionEntry<"authors">[];
  tags: string[];
  setPublications: React.Dispatch<
    React.SetStateAction<PublicationWithAuthors[]>
  >;
}

export const PublicationContext = createContext<
  PublicationContextState | undefined
>(undefined);

export interface PublicationProviderProps {
  initialPublications: PublicationWithAuthors[];
  tags: string[];
  authors: CollectionEntry<"authors">[];
  children: React.ReactNode;
}

export function PublicationProvider({
  initialPublications,
  tags,
  authors,
  children,
}: PublicationProviderProps) {
  const [publications, setPublications] =
    useState<PublicationWithAuthors[]>(initialPublications);

  return (
    <PublicationContext.Provider
      value={{
        initialPublications,
        publications,
        authors,
        tags,
        setPublications,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
}
