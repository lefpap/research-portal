import type {
  FeaturedProject,
  FeaturedPublication,
  NavLink,
} from "@/config/types";

export const SITE_TITLE = {
  en: "Research Portal",
  el: "Ερευνητική Πύλη",
} as const;

export const NAV_LINKS = [
  {
    code: "home",
    name: {
      en: "Home",
      el: "Αρχική",
    },
    href: "/",
  },
  {
    code: "team",
    name: {
      en: "Team",
      el: "Ομάδα",
    },
    href: "/team",
  },
  {
    code: "news",
    name: {
      en: "News",
      el: "Νέα",
    },
    href: "/news",
  },
  {
    code: "research",
    name: {
      en: "Research",
      el: "Έρευνα",
    },
    items: [
      {
        code: "projects",
        name: {
          en: "Projects",
          el: "Έργα",
        },
        href: "/projects",
      },
      {
        code: "publications",
        name: {
          en: "Publications",
          el: "Άρθρα",
        },
        href: "/publications",
      },
    ],
  },
] as const satisfies NavLink[];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  "project-01",
  "project-02",
] as const satisfies FeaturedProject[];

export const FEATURED_PUBLICATIONS: FeaturedPublication[] = [
  "pub-00",
] as const satisfies FeaturedPublication[];
