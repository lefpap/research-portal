import { cn } from "@/lib/utils";
import NewsCard from "@/components/blocks/News/NewsCard";
import type { CollectionEntry } from "astro:content";

interface NewsGridProps {
  newsItems: CollectionEntry<"news">[];
  className?: string;
}

function NewsGrid({ newsItems, className }: NewsGridProps) {
  return (
    <ul className={cn("grid items-stretch gap-10", className)}>
      {newsItems.map((article) => {
        return (
          <li key={article.id} className="overflow-x-hidden">
            <NewsCard article={article} />
          </li>
        );
      })}
    </ul>
  );
}

export default NewsGrid;
