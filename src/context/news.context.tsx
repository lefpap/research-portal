import { defaultLang, type Lang } from "@/i18n/config";
import type { CollectionEntry } from "astro:content";
import { createContext, useMemo, useState } from "react";

export interface NewsItem {
  article: CollectionEntry<"news">;
  author: CollectionEntry<"authors">;
}

export interface NewsContextState {
  initialNewsItems: NewsItem[];
  newsItems: NewsItem[];
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  authors: CollectionEntry<"authors">[];
  tags: string[];
  lang: Lang;
}

export const NewsContext = createContext<NewsContextState | undefined>(
  undefined,
);

export interface NewsProviderProps {
  initialNewsItems: NewsItem[];
  lang?: Lang;
  children: React.ReactNode;
}

export function NewsProvider({
  initialNewsItems,
  lang = defaultLang,
  children,
}: NewsProviderProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNewsItems);

  // Memoized unique tags with case-insensitive sorting
  const uniqueTags = useMemo(() => {
    const allTags = initialNewsItems.flatMap(
      ({ article }) => article.data.tags || [],
    );
    const uniqueTags = Array.from(new Set(allTags))
      .filter((tag): tag is string => Boolean(tag))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    return uniqueTags;
  }, [initialNewsItems]);

  // Memoized unique authors sorted by slug (case-insensitive)
  const uniqueAuthors = useMemo(() => {
    const authors = initialNewsItems.map((item) => item.author);
    // Filter out duplicates by author id and sort alphabetically by slug
    const uniqueAuthors = Array.from(new Set(authors.map((a) => a.id))) // Assuming author has an 'id' field for uniqueness
      .map((id) => authors.find((a) => a.id === id))
      .filter((author): author is CollectionEntry<"authors"> => !!author) // Filters out any possible undefined authors
      .sort((a, b) =>
        a.slug.localeCompare(b.slug, undefined, { sensitivity: "base" }),
      );

    return uniqueAuthors;
  }, [initialNewsItems]);

  return (
    <NewsContext.Provider
      value={{
        initialNewsItems,
        newsItems,
        setNewsItems,
        authors: uniqueAuthors,
        tags: uniqueTags,
        lang,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}
