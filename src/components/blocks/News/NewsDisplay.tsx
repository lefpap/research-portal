import { cn } from "@/lib/utils";
import NewsGrid from "./NewsGrid";
import NewsFilters from "./NewsFilters";
import { NewsProvider, type NewsProviderProps } from "@/context/news.context";
import { useNewsCtx } from "@/hooks/useNewsCtx.hook";
import { useTranslations } from "@/i18n/utils";

interface NewsDisplayProps extends Omit<NewsProviderProps, "children"> {
  className?: string;
}

function NewsDisplay({ initialNewsItems, lang, className }: NewsDisplayProps) {
  return (
    <NewsProvider initialNewsItems={initialNewsItems} lang={lang}>
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
          <NewsItemsDisplay className="flex-1" />
        </div>
      </div>
    </NewsProvider>
  );
}

export function NewsItemsDisplay({ className }: { className?: string }) {
  const { newsItems, lang } = useNewsCtx();
  const t = useTranslations(lang);

  if (newsItems.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        {t("component.news-display.empty")}
      </p>
    );
  }

  return <NewsGrid newsItems={newsItems} className={className} />;
}

export default NewsDisplay;
