import { cn } from "@/lib/utils";
import NewsCard from "@/components/blocks/News/NewsCard";
import { useNewsCtx } from "@/hooks/useNewsCtx.hook";
import CollectionOrEmptyMessage from "@/components/utility/CollectionOrEmptyMessage";

interface NewsGridProps {
  className?: string;
}

function NewsGrid({ className }: NewsGridProps) {
  const { news } = useNewsCtx();

  return (
    <CollectionOrEmptyMessage
      collection={news}
      emptyMessage={
        <p className="w-full text-center text-sm text-muted-foreground">
          No news to display
        </p>
      }
    >
      <ul className={cn("grid items-stretch gap-10", className)}>
        {news.map((article) => {
          return (
            <li key={article.id} className="overflow-x-hidden">
              <NewsCard article={article} className="" />
            </li>
          );
        })}
      </ul>
    </CollectionOrEmptyMessage>
  );
}

export default NewsGrid;
