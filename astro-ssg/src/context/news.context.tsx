import type { CollectionEntry } from "astro:content";
import { createContext, useState } from "react";

export interface NewsContextState {
  initialNews: CollectionEntry<"news">[];
  news: CollectionEntry<"news">[];
  tags: string[];
  setNews: React.Dispatch<React.SetStateAction<CollectionEntry<"news">[]>>;
}

export const NewsContext = createContext<NewsContextState | undefined>(
  undefined,
);

export interface NewsProviderProps {
  initialNews: CollectionEntry<"news">[];
  tags: string[];
  children: React.ReactNode;
}

export function NewsProvider({
  initialNews,
  tags,
  children,
}: NewsProviderProps) {
  const [news, setNews] = useState<CollectionEntry<"news">[]>(initialNews);

  return (
    <NewsContext.Provider value={{ initialNews, news, setNews, tags }}>
      {children}
    </NewsContext.Provider>
  );
}
