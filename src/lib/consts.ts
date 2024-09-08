import type { CollectionEntry } from "astro:content";

export const NAV_LINKS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Team",
    href: "/team",
  },
  {
    name: "News",
    href: "/news",
  },
  {
    name: "Research",
    links: [
      {
        name: "Projects",
        href: "/projects",
      },
      {
        name: "Publications",
        href: "/publications",
      },
    ],
  },
];

export const FEATURED_PROJECTS: CollectionEntry<"projects">["slug"][] = [
  "project-01",
  "project-02",
] as const;

export const FEATURED_PUBLICATIONS: CollectionEntry<"publications">["slug"][] =
  ["pub-00"] as const;
