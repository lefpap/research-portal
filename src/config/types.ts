import type { CollectionEntry } from "astro:content";
import type { Lang } from "@/config/i18n.config";

export interface HrefLink {
  code: string;
  name: {
    [key in Lang]: string;
  };
  href: string;
}

export interface MenuLink {
  code: string;
  name: {
    [key in Lang]: string;
  };
  items: readonly HrefLink[];
}

export type NavLink = HrefLink | MenuLink;

// The type of all links in the navigation
export type WithoutLang<T extends string> = T extends `${string}/${infer Slug}`
  ? Slug
  : T;

// Add all projects to be featured here
export type FeaturedProject = WithoutLang<CollectionEntry<"projects">["slug"]>;

// Add all publications to be featured here
export type FeaturedPublication = WithoutLang<
  CollectionEntry<"publications">["slug"]
>;
