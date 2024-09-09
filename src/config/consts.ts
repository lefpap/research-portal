import type { CollectionEntry } from "astro:content";
import type { WithoutLang } from "@/i18n/utils";

// Dynamically extract the types from NAV_LINKS
export type NavLink = (typeof NAV_LINKS)[number];

// If the link has an `href`, it is a top-level `HrefLink`
export type HrefLink = Extract<NavLink, { href: string }>;

// If the link has `links`, it is a `MenuLink`
export type MenuLink = Extract<NavLink, { links: readonly any[] }>;

// SubLink is the type of the elements in the `links` array inside `MenuLink`
export type SubLink = MenuLink["links"][number];

export const NAV_LINKS = [
  {
    code: "home",
    href: "/",
  },
  {
    code: "team",
    href: "/team",
  },
  {
    code: "news",
    href: "/news",
  },
  {
    code: "research",
    links: [
      {
        code: "projects",
        href: "/projects",
      },
      {
        code: "publications",
        href: "/publications",
      },
    ],
  },
] as const;

// Add all projects to be featured here
type FeaturedProject = WithoutLang<CollectionEntry<"projects">["slug"]>;
export const FEATURED_PROJECTS: FeaturedProject[] = [
  "project-01",
  "project-02",
] as const satisfies FeaturedProject[];

// Add all publications to be featured here
type FeaturedPublication = WithoutLang<CollectionEntry<"publications">["slug"]>;
export const FEATURED_PUBLICATIONS: FeaturedPublication[] = [
  "pub-00",
] as const satisfies FeaturedPublication[];
