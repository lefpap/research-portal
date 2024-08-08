import type { CollectionEntry } from "astro:content";
import { createContext, useState } from "react";

export interface PublicationItem {
  publication: CollectionEntry<"publications">;
  authors: CollectionEntry<"authors">[];
}

export interface PublicationContextState {
  initialPublicationItems: PublicationItem[];
  publicationItems: PublicationItem[];
  authors: CollectionEntry<"authors">[];
  tags: string[];
  setPublicationItems: React.Dispatch<React.SetStateAction<PublicationItem[]>>;
}

export const PublicationContext = createContext<
  PublicationContextState | undefined
>(undefined);

export interface PublicationProviderProps {
  initialPublicationItems: PublicationItem[];
  tags: string[];
  authors: CollectionEntry<"authors">[];
  children: React.ReactNode;
}

export function PublicationProvider({
  initialPublicationItems,
  tags,
  authors,
  children,
}: PublicationProviderProps) {
  const [publicationItems, setPublicationItems] = useState<PublicationItem[]>(
    initialPublicationItems,
  );

  return (
    <PublicationContext.Provider
      value={{
        initialPublicationItems,
        publicationItems,
        authors,
        tags,
        setPublicationItems: setPublicationItems,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
}
