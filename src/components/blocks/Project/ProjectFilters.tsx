import { useEffect, useState } from "react";
import TagsToggleGroup from "../../utility/TagsToggleGroup";
import AuthorsToggleGroup from "@/components/utility/AuthorsToggleGroup";
import SearchInput from "@/components/utility/SearchInput";
import { cn } from "@/lib/app.utils";
import { useProjectsCtx } from "@/hooks/useProjectsCtx.hook";
import type { CollectionEntry } from "astro:content";
import { useTranslations } from "@/lib/i18n.utils";

interface ProjectFiltersProps {
  className?: string;
}

interface ProjectFilters {
  search?: string;
  authors?: string[];
  tags?: string[];
}

function ProjectFilters({ className }: ProjectFiltersProps) {
  const { initialProjectItems, setProjectItems, authors, tags, lang } =
    useProjectsCtx();

  const t = useTranslations(lang);

  const [filters, setFilters] = useState<ProjectFilters>({
    search: undefined,
    authors: undefined,
    tags: undefined,
  });

  const hasFilters = filters.search || filters.tags || filters.authors;

  const handleSearchChange = (search?: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleTagsChange = (tags?: string[]) => {
    setFilters((prev) => ({ ...prev, tags }));
  };

  const handleAuthorsChange = (ids?: string[]) => {
    setFilters((prev) => ({ ...prev, authors: ids }));
  };

  useEffect(() => {
    let filteredProjectItems = [...initialProjectItems];

    if (filters.search) {
      const search = filters.search.trim().toLowerCase();
      filteredProjectItems = filteredProjectItems.filter(
        (item) =>
          item.project.data.title.toLowerCase().includes(search) ||
          item.project.data.summary.toLowerCase().includes(search),
      );
    }

    if (filters.authors) {
      filteredProjectItems = filteredProjectItems.filter((item) =>
        filters.authors?.some((id) =>
          item.authors
            .map((author) => author.id)
            ?.includes(id as CollectionEntry<"authors">["id"]),
        ),
      );
    }

    if (filters.tags) {
      filteredProjectItems = filteredProjectItems.filter((item) =>
        filters.tags?.some((tag) => item.project.data.tags?.includes(tag)),
      );
    }

    setProjectItems(hasFilters ? filteredProjectItems : initialProjectItems);
  }, [filters, hasFilters, initialProjectItems]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <SearchInput
        placeholder={t("component.projects-filters.search.placeholder")}
        onChange={handleSearchChange}
      />
      <AuthorsToggleGroup
        authors={authors}
        label={t("component.projects-filters.authors.label")}
        onChange={handleAuthorsChange}
      />
      <div className="w-full border-b border-b-muted"></div>
      <TagsToggleGroup
        label={t("component.projects-filters.tags.label")}
        tags={tags}
        onChange={handleTagsChange}
      />
    </div>
  );
}

export default ProjectFilters;
