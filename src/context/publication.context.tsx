import { defaultLang, type Lang } from "@/i18n/config";
import type { CollectionEntry } from "astro:content";
import { createContext, useMemo, useState } from "react";

export interface PublicationItem {
  publication: CollectionEntry<"publications">;
  authors: CollectionEntry<"authors">[];
}

export interface PublicationContextState {
  initialPublicationItems: PublicationItem[];
  publicationItems: PublicationItem[];
  setPublicationItems: React.Dispatch<React.SetStateAction<PublicationItem[]>>;
  authors: CollectionEntry<"authors">[];
  tags: string[];
  lang: Lang;
}

export const PublicationContext = createContext<
  PublicationContextState | undefined
>(undefined);

export interface PublicationProviderProps {
  initialPublicationItems: PublicationItem[];
  lang?: Lang;
  children: React.ReactNode;
}

export function PublicationProvider({
  initialPublicationItems,
  lang = defaultLang,
  children,
}: PublicationProviderProps) {
  const [publicationItems, setPublicationItems] = useState<PublicationItem[]>(
    initialPublicationItems,
  );

  // Memoized unique tags with case-insensitive sorting
  const uniqueTags = useMemo(() => {
    const allTags = initialPublicationItems.flatMap(
      ({ publication }) => publication.data.tags || [],
    );
    const uniqueTags = Array.from(new Set(allTags))
      .filter((tag): tag is string => Boolean(tag))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    return uniqueTags;
  }, [initialPublicationItems]);

  // Memoized unique authors sorted by slug (case-insensitive)
  const uniqueAuthors = useMemo(() => {
    const allAuthors = initialPublicationItems.flatMap((item) => item.authors);
    const uniqueAuthors = Array.from(new Set(allAuthors.map((a) => a.id)))
      .map((id) => allAuthors.find((a) => a.id === id))
      .filter((author): author is CollectionEntry<"authors"> => !!author)
      .sort((a, b) =>
        a.slug.localeCompare(b.slug, undefined, { sensitivity: "base" }),
      );

    return uniqueAuthors;
  }, [initialPublicationItems]);

  return (
    <PublicationContext.Provider
      value={{
        initialPublicationItems,
        publicationItems,
        setPublicationItems,
        authors: uniqueAuthors,
        tags: uniqueTags,
        lang,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
}
