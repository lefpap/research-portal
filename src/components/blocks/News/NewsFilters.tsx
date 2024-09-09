import TagsToggleGroup from "../../utility/TagsToggleGroup";
import { cn } from "@/lib/utils";
import TimeToggleGroup from "@/components/utility/TimeToggleGroup";
import SearchInput from "@/components/utility/SearchInput";
import { useEffect, useState } from "react";
import { isToday, subDays, subMonths, subYears, isAfter } from "date-fns";
import { useNewsCtx } from "@/hooks/useNewsCtx.hook";
import { useTranslations } from "@/i18n/utils";
import AuthorsToggleGroup from "@/components/utility/AuthorsToggleGroup";

interface NewsFiltersProps {
  className?: string;
}

interface NewsFilters {
  search?: string;
  time?: { name: string; value: string };
  authors?: string[];
  tags?: string[];
}

function NewsFilters({ className }: NewsFiltersProps) {
  const { tags, authors, initialNewsItems, setNewsItems, lang } = useNewsCtx();

  const t = useTranslations(lang);

  const [filters, setFilters] = useState<NewsFilters>({
    search: undefined,
    time: undefined,
    authors: undefined,
    tags: undefined,
  });
  const hasFilters =
    filters.search || filters.time || filters.authors || filters.tags;

  const handleSearchChange = (search?: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleTimeChange = (time?: { name: string; value: string }) => {
    setFilters((prev) => ({ ...prev, time }));
  };

  const handleAuthorsChange = (ids?: string[]) => {
    setFilters((prev) => ({ ...prev, authors: ids }));
  };

  const handleTagsChange = (tags?: string[]) => {
    setFilters((prev) => ({ ...prev, tags }));
  };

  useEffect(() => {
    let filteredNewsItems = [...initialNewsItems];

    if (filters.search) {
      const search = filters.search.trim().toLowerCase();
      filteredNewsItems = filteredNewsItems.filter(
        ({ article }) =>
          article.data.title.toLowerCase().includes(search) ||
          article.data.summary.toLowerCase().includes(search),
      );
    }

    if (filters.time) {
      const time = filters.time.value.toLowerCase();
      const today = new Date();

      switch (time) {
        case "today":
          filteredNewsItems = filteredNewsItems.filter(({ article }) => {
            const { publishedAt } = article.data;
            return isToday(new Date(publishedAt));
          });
          break;
        case "week":
          const weekAgo = subDays(today, 7);
          filteredNewsItems = filteredNewsItems.filter(({ article }) => {
            const { publishedAt } = article.data;
            return isAfter(new Date(publishedAt), weekAgo);
          });
          break;
        case "month":
          const monthAgo = subMonths(today, 1);
          filteredNewsItems = filteredNewsItems.filter(({ article }) => {
            const { publishedAt } = article.data;
            return isAfter(new Date(publishedAt), monthAgo);
          });
          break;
        case "year":
          const yearAgo = subYears(today, 1);
          filteredNewsItems = filteredNewsItems.filter(({ article }) => {
            const { publishedAt } = article.data;
            return isAfter(new Date(publishedAt), yearAgo);
          });
          break;
        default:
          console.error("Invalid time filter");
          break;
      }
    }

    if (filters.authors) {
      filteredNewsItems = filteredNewsItems.filter((item) =>
        filters.authors?.includes(item.author.id),
      );
    }

    if (filters.tags) {
      filteredNewsItems = filteredNewsItems.filter(({ article }) =>
        filters.tags?.some((tag) => article.data.tags?.includes(tag)),
      );
    }

    hasFilters
      ? setNewsItems(filteredNewsItems)
      : setNewsItems(initialNewsItems);
  }, [filters, hasFilters, initialNewsItems]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <SearchInput
        placeholder={t("component.news-filters.search.placeholder")}
        onChange={handleSearchChange}
      />

      <TimeToggleGroup onChange={handleTimeChange} />
      <AuthorsToggleGroup
        authors={authors}
        label={t("component.news-filters.authors.label")}
        onChange={handleAuthorsChange}
      />
      <div className="w-full border-b border-b-muted"></div>
      <TagsToggleGroup
        label={t("component.news-filters.tags.label")}
        tags={tags}
        onChange={handleTagsChange}
      />
    </div>
  );
}

export default NewsFilters;
