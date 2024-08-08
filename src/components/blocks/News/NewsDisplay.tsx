import { cn } from "@/lib/utils";
import NewsGrid from "./NewsGrid";
import NewsFilters from "./NewsFilters";
import { NewsProvider, type NewsProviderProps } from "@/context/news.context";

interface NewsDisplayProps extends Omit<NewsProviderProps, "children"> {
  className?: string;
}

function NewsDisplay({ initialNews, tags, className }: NewsDisplayProps) {
  return (
    <NewsProvider initialNews={initialNews} tags={tags}>
      <div
        className={cn(
          "flex flex-col items-stretch justify-between gap-5 md:flex-row",
          className,
        )}
      >
        <div className="w-full md:w-2/4">
          <NewsFilters className="sm:sticky sm:top-28" />
        </div>
        <div className={"flex w-full"}>
          <NewsGrid className="flex-1" />
        </div>
      </div>
    </NewsProvider>
  );
}

export default NewsDisplay;
