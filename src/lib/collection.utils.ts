import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { type Lang, defaultLang } from "@/config/i18n.config";
import { slugWitoutLang } from "@/lib/i18n.utils";
import type { ProjectItem } from "@/context/project.context";
import type { PublicationItem } from "@/context/publication.context";
import { extractLangFromUri } from "@/lib/i18n.utils";
import type { NewsItem } from "@/context/news.context";
import type { WithoutLang } from "@/config/types";

export const fetchLatestNews = async ({
  limit,
  lang = defaultLang,
  filters = [],
}: {
  limit: number;
  lang?: Lang;
  filters?: ((article: CollectionEntry<"news">) => boolean)[];
}) => {
  const newsItems = await fetchAllNews({ lang, filters });

  // Sort and limit the results
  return newsItems.slice(0, limit) satisfies NewsItem[];
};

export const fetchFeaturedProjects = async ({
  featured,
  lang = defaultLang,
  filters = [],
}: {
  featured: WithoutLang<CollectionEntry<"projects">["slug"]>[];
  lang?: Lang;
  filters?: ((project: CollectionEntry<"projects">) => boolean)[];
}) => {
  // Add a filter at the start to only include featured publications
  filters.unshift(({ slug }) => featured.includes(slugWitoutLang(slug)));

  // Fetch all projects
  const projects = await fetchAllProjects({ lang, filters });
  return projects satisfies ProjectItem[];
};

export const fetchFeaturedPublications = async ({
  featured,
  lang = defaultLang,
  filters = [],
}: {
  featured: WithoutLang<CollectionEntry<"publications">["slug"]>[];
  lang?: Lang;
  filters?: ((publication: CollectionEntry<"publications">) => boolean)[];
}) => {
  // Add a filter at the start to only include featured publications
  filters.unshift(({ slug }) => featured.includes(slugWitoutLang(slug)));

  // Fetch all publications
  const publications = await fetchAllPublications({ lang, filters });

  return publications.sort(
    (a, b) =>
      new Date(b.publication.data.publishedAt).getTime() -
      new Date(a.publication.data.publishedAt).getTime(),
  );
};

export const fetchAllAuthors = async ({
  lang = defaultLang,
  filters = [],
}: {
  lang?: Lang;
  filters?: ((author: CollectionEntry<"authors">) => boolean)[];
}) => {
  // Add a filter at the start to only include authors in the current language
  filters.unshift(({ slug }) => slug.startsWith(lang));

  // Fetch all authors
  const authors = await getCollection("authors", (author) =>
    filters.every((filter) => filter(author)),
  );

  return authors;
};

export const fetchAllProjects = async ({
  lang = defaultLang,
  filters = [],
}: {
  lang?: Lang;
  filters?: ((project: CollectionEntry<"projects">) => boolean)[];
}) => {
  // Add a filter at the start to only include projects in the current language
  filters.unshift(({ slug }) => slug.startsWith(lang));

  // Fetch all projects
  const projects = await getCollection("projects", (project) =>
    filters.every((filter) => filter(project)),
  );

  // Populate authors for each project
  const populatedProjects = await Promise.all(
    projects.map(async (project) => {
      const authors = await getCollection("authors", ({ slug }) =>
        project.data.authors.map((author) => author.slug).includes(slug),
      );

      return {
        project,
        authors,
      };
    }),
  );

  return populatedProjects satisfies ProjectItem[];
};

export const fetchAllPublications = async ({
  lang = defaultLang,
  filters = [],
}: {
  lang?: Lang;
  filters?: ((publication: CollectionEntry<"publications">) => boolean)[];
}) => {
  // Add a filter at the start to only include publications in the current language
  filters.unshift(({ slug }) => slug.startsWith(lang));

  // Fetch all publications
  const publications = await getCollection("publications", (publication) =>
    filters.every((filter) => filter(publication)),
  );

  // Populate authors for each publication
  const populatedPublications = await Promise.all(
    publications.map(async (publication) => {
      const authors = await getCollection("authors", ({ slug }) =>
        publication.data.authors.map((author) => author.slug).includes(slug),
      );

      return {
        publication,
        authors,
      };
    }),
  );

  // Sort publications by published date
  const sortedPublications = populatedPublications.sort(
    (a, b) =>
      new Date(b.publication.data.publishedAt).getTime() -
      new Date(a.publication.data.publishedAt).getTime(),
  );

  return sortedPublications satisfies PublicationItem[];
};

export const fetchAllNews = async ({
  lang = defaultLang,
  filters = [],
}: {
  lang?: Lang;
  filters?: ((article: CollectionEntry<"news">) => boolean)[];
}) => {
  // Add a filter at the start to only include news in the current language
  filters.unshift(({ slug }) => slug.startsWith(lang));

  // Fetch all news
  const news = await getCollection("news", (article) =>
    filters.every((filter) => filter(article)),
  );

  // Populate authors for each publication
  const populatedNews = await Promise.all(
    news.map(async (article) => {
      const author = await getEntry("authors", article.data.author.slug);

      return {
        article,
        author,
      };
    }),
  );

  const sortedNews = populatedNews.sort(
    (a, b) =>
      new Date(b.article.data.publishedAt).getTime() -
      new Date(a.article.data.publishedAt).getTime(),
  );

  return sortedNews satisfies NewsItem[];
};

export const fetchEducationByAuthor = async ({
  author,
  filters = [],
}: {
  author: CollectionEntry<"authors"> | CollectionEntry<"authors">["slug"];
  filters?: ((project: CollectionEntry<"education">) => boolean)[];
}) => {
  // If author is a string, fetch the author entry
  if (typeof author === "string") {
    author = await getEntry("authors", author);
  }

  // Add a filter at the start to only include education entries for the author
  filters.unshift(({ data }) => data.author.slug === author.slug);

  // Fetch all education entries
  const authorEducation = await getCollection("education", (education) =>
    filters.every((filter) => filter(education)),
  );

  // Sort education entries by start date
  return authorEducation.sort(
    (a, b) =>
      new Date(b.data.startDate).getTime() -
      new Date(a.data.startDate).getTime(),
  );
};

export const fetchWorkExperienceByAuthor = async ({
  author,
  filters = [],
}: {
  author: CollectionEntry<"authors"> | CollectionEntry<"authors">["slug"];
  filters?: ((work: CollectionEntry<"work-experience">) => boolean)[];
}) => {
  // If author is a string, fetch the author entry
  if (typeof author === "string") {
    author = await getEntry("authors", author);
  }

  // Add a filter at the start to only include education entries for the author
  filters.unshift(({ data }) => data.author.slug === author.slug);

  // Add a filter at the start to only include work experience entries for the author
  const authorWorkExperience = await getCollection("work-experience", (work) =>
    filters.every((filter) => filter(work)),
  );

  // Sort work experience entries by start date
  return authorWorkExperience.sort(
    (a, b) =>
      new Date(b.data.startDate).getTime() -
      new Date(a.data.startDate).getTime(),
  );
};

export const fetchProjectsByAuthor = async ({
  author,
  filters = [],
}: {
  author: CollectionEntry<"authors"> | CollectionEntry<"authors">["slug"];
  filters?: ((project: CollectionEntry<"projects">) => boolean)[];
}) => {
  // If author is a string, fetch the author entry
  if (typeof author === "string") {
    author = await getEntry("authors", author);
  }

  // Add a filter at the start to only include projects for the author
  filters.unshift(({ data }) =>
    data.authors.map((a) => a.slug).includes(author.slug),
  );

  // Fetch all projects
  const [lang] = extractLangFromUri(author.slug);
  const authorProjects = await fetchAllProjects({ lang, filters });

  return authorProjects satisfies ProjectItem[];
};

export const fetchPublicationsByAuthor = async ({
  author,
  filters = [],
}: {
  author: CollectionEntry<"authors"> | CollectionEntry<"authors">["slug"];
  filters?: ((publication: CollectionEntry<"publications">) => boolean)[];
}) => {
  // If author is a string, fetch the author entry
  if (typeof author === "string") {
    author = await getEntry("authors", author);
  }

  // Add a filter at the start to only include publications for the author
  filters.unshift(({ data }) =>
    data.authors.map((a) => a.slug).includes(author.slug),
  );

  // Fetch all publications
  const [lang] = extractLangFromUri(author.slug);
  const authorPublications = await fetchAllPublications({ lang, filters });

  // Sort publications by published date
  return authorPublications.sort(
    (a, b) =>
      new Date(b.publication.data.publishedAt).getTime() -
      new Date(a.publication.data.publishedAt).getTime(),
  ) satisfies PublicationItem[];
};
