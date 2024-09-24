import { useEffect, useState } from "react";
import type { CollectionEntry } from "astro:content";
import { isToday, subDays, subMonths, subYears, isAfter } from "date-fns";
import { cn } from "@/lib/app.utils";
import TagsToggleGroup from "@/components/utility/TagsToggleGroup";
import TimeToggleGroup from "@/components/utility/TimeToggleGroup";
import SearchInput from "@/components/utility/SearchInput";
import { usePublicationsCtx } from "@/hooks/usePublicationsCtx.hook";
import AuthorsToggleGroup from "@/components/utility/AuthorsToggleGroup";
import { useTranslations } from "@/lib/i18n.utils";

interface PublicationFilters {
  search?: string;
  time?: { name: string; value: string };
  authors?: string[];
  tags?: string[];
}

interface PublicationFiltersProps {
  className?: string;
}

function PublicationFilters({ className }: PublicationFiltersProps) {
  const { tags, initialPublicationItems, authors, setPublicationItems, lang } =
    usePublicationsCtx();

  const t = useTranslations(lang);

  const [filters, setFilters] = useState<PublicationFilters>({
    search: undefined,
    authors: undefined,
    time: undefined,
    tags: undefined,
  });

  const hasFilters =
    filters.search || filters.time || filters.tags || filters.authors;

  const handleSearchChange = (search?: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleTimeChange = (time?: { name: string; value: string }) => {
    setFilters((prev) => ({ ...prev, time }));
  };

  const handleTagsChange = (tags?: string[]) => {
    setFilters((prev) => ({ ...prev, tags }));
  };

  const handleAuthorsChange = (ids?: string[]) => {
    setFilters((prev) => ({ ...prev, authors: ids }));
  };

  useEffect(() => {
    let filteredPublicationItems = [...initialPublicationItems];

    if (filters.search) {
      const search = filters.search.trim().toLowerCase();
      filteredPublicationItems = filteredPublicationItems.filter(
        (item) =>
          item.publication.data.title.toLowerCase().includes(search) ||
          item.publication.data.summary.toLowerCase().includes(search),
      );
    }

    if (filters.time) {
      const time = filters.time.value.toLowerCase();
      const today = new Date();

      switch (time) {
        case "today":
          filteredPublicationItems = filteredPublicationItems.filter(
            ({ publication }) => {
              const { publishedAt } = publication.data;
              return isToday(new Date(publishedAt));
            },
          );
          break;
        case "week":
          const weekAgo = subDays(today, 7);
          filteredPublicationItems = filteredPublicationItems.filter(
            ({ publication }) => {
              const { publishedAt } = publication.data;
              return isAfter(new Date(publishedAt), weekAgo);
            },
          );
          break;
        case "month":
          const monthAgo = subMonths(today, 1);
          filteredPublicationItems = filteredPublicationItems.filter(
            ({ publication }) => {
              const { publishedAt } = publication.data;
              return isAfter(new Date(publishedAt), monthAgo);
            },
          );
          break;
        case "year":
          const yearAgo = subYears(today, 1);
          filteredPublicationItems = filteredPublicationItems.filter(
            ({ publication }) => {
              const { publishedAt } = publication.data;
              return isAfter(new Date(publishedAt), yearAgo);
            },
          );
          break;
        default:
          console.error("Invalid time filter");
          break;
      }
    }

    if (filters.authors) {
      filteredPublicationItems = filteredPublicationItems.filter(
        ({ authors }) =>
          filters.authors?.some((id) =>
            authors
              .map((author) => author.id)
              ?.includes(id as CollectionEntry<"authors">["id"]),
          ),
      );
    }

    if (filters.tags) {
      filteredPublicationItems = filteredPublicationItems.filter(
        ({ publication }) =>
          filters.tags?.some((tag) => publication.data.tags?.includes(tag)),
      );
    }

    setPublicationItems(
      hasFilters ? filteredPublicationItems : initialPublicationItems,
    );
  }, [filters, hasFilters, initialPublicationItems]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <SearchInput
        placeholder={t("component.publications-filters.search.placeholder")}
        onChange={handleSearchChange}
      />
      <TimeToggleGroup onChange={handleTimeChange} />
      <AuthorsToggleGroup
        authors={authors}
        label={t("component.publications-filters.authors.label")}
        onChange={handleAuthorsChange}
      />
      <div className="w-full border-b border-b-muted"></div>
      <TagsToggleGroup
        label={t("component.publications-filters.tags.label")}
        tags={tags}
        onChange={handleTagsChange}
      />
    </div>
  );
}

export default PublicationFilters;
