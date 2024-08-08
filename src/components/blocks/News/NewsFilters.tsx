import TagsToggleGroup from "../../utility/TagsToggleGroup";
import { cn } from "@/lib/utils";
import TimeToggleGroup from "@/components/utility/TimeToggleGroup";
import SearchInput from "@/components/utility/SearchInput";
import { useEffect, useState } from "react";
import { isToday, subDays, subMonths, subYears, isAfter } from "date-fns";
import { useNewsCtx } from "@/hooks/useNewsCtx.hook";

interface NewsFiltersProps {
  className?: string;
}

interface FilterProps {
  search?: string;
  time?: { name: string; value: string };
  tags?: string[];
}

function NewsFilters({ className }: NewsFiltersProps) {
  const { tags, initialNews, setNews } = useNewsCtx();
  const [filters, setFilters] = useState<FilterProps>({
    search: undefined,
    time: undefined,
    tags: undefined,
  });
  const hasFilters = filters.search || filters.time || filters.tags;

  const handleSearchChange = (search?: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleTimeChange = (time?: { name: string; value: string }) => {
    setFilters((prev) => ({ ...prev, time }));
  };

  const handleTagsChange = (tags?: string[]) => {
    setFilters((prev) => ({ ...prev, tags }));
  };

  useEffect(() => {
    let filteredNews = [...initialNews];

    if (filters.search) {
      const search = filters.search.trim().toLowerCase();
      filteredNews = filteredNews.filter((article) =>
        article.data.title.toLowerCase().includes(search),
      );
    }

    if (filters.time) {
      const time = filters.time.value.toLowerCase();
      const today = new Date();

      switch (time) {
        case "today":
          filteredNews = filteredNews.filter((article) => {
            const { publishedAt } = article.data;
            return isToday(new Date(publishedAt));
          });
          break;
        case "week":
          const weekAgo = subDays(today, 7);
          filteredNews = filteredNews.filter((article) => {
            const { publishedAt } = article.data;
            return isAfter(new Date(publishedAt), weekAgo);
          });
          break;
        case "month":
          const monthAgo = subMonths(today, 1);
          filteredNews = filteredNews.filter((article) => {
            const { publishedAt } = article.data;
            return isAfter(new Date(publishedAt), monthAgo);
          });
          break;
        case "year":
          const yearAgo = subYears(today, 1);
          filteredNews = filteredNews.filter((article) => {
            const { publishedAt } = article.data;
            return isAfter(new Date(publishedAt), yearAgo);
          });
          break;
        default:
          console.error("Invalid time filter");
          break;
      }
    }

    if (filters.tags) {
      filteredNews = filteredNews.filter((article) =>
        filters.tags?.some((tag) => article.data.tags?.includes(tag)),
      );
    }

    hasFilters ? setNews(filteredNews) : setNews(initialNews);
  }, [filters, hasFilters, initialNews]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <SearchInput
        placeholder="Search for an article..."
        onChange={handleSearchChange}
      />
      <TimeToggleGroup onChange={handleTimeChange} />
      <div className="w-full border-b border-b-muted"></div>
      <TagsToggleGroup label="Tags" tags={tags} onChange={handleTagsChange} />
    </div>
  );
}

export default NewsFilters;
