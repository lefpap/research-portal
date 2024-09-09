import { cn } from "@/lib/utils";
import NewsCard from "@/components/blocks/News/NewsCard";
import type { NewsItem } from "@/context/news.context";

interface NewsGridProps {
  newsItems: NewsItem[];
  className?: string;
}

function NewsGrid({ newsItems, className }: NewsGridProps) {
  return (
    <ul className={cn("grid items-stretch gap-10", className)}>
      {newsItems.map((item) => {
        return (
          <li key={item.article.id} className="overflow-x-hidden">
            <NewsCard newsItem={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default NewsGrid;
