import { defaultLang, languages, showDefaultLang } from "@/config/i18n.config";
import { translations } from "@/config/translations/index";
import type { WithoutLang } from "@/config/types";
import type { CollectionEntry, CollectionKey } from "astro:content";

// Declare overload signatures
export function extractLangFromUri(url: URL): [keyof typeof languages, string];
export function extractLangFromUri(
  pathname: string,
): [keyof typeof languages, string];

export function extractLangFromUri(
  input: URL | string,
): [keyof typeof languages, string] {
  // If input is a URL, extract pathname and call the same function with pathname
  if (input instanceof URL) {
    return extractLangFromUri(input.pathname);
  }

  if (!input.startsWith("/")) {
    input = `/${input}`;
  }

  // Split the input to extract the lang and the remaining part of the URL
  const [, lang, ...rest] = input.split("/");

  // Construct the URI without the lang
  const uriWithoutLang = `/${rest.join("/")}`;

  // Check if the extracted lang is valid, otherwise return defaultLang
  if (lang in languages) {
    return [lang as keyof typeof languages, uriWithoutLang];
  }

  // If lang is invalid, return the defaultLang and the original URI
  return [defaultLang, input];
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}

export function translateUri(
  uri: string,
  lang?: keyof typeof languages,
): string {
  // If no language is provided, fallback to the defaultLang
  lang = lang ?? defaultLang;

  // Normalize the URI by ensuring there are no duplicate lang entries
  const regex = new RegExp(`/${lang}`, "g");
  const cleanedUri = uri.replace(regex, "");

  // Check if we should show the default language in the path or not
  if (!showDefaultLang && lang === defaultLang) {
    return cleanedUri; // Return the original URI without the lang prefix
  }

  // Construct the translated path
  const translatedPath = `/${lang}${cleanedUri}`
    .replace(/\/+/g, "/") // Ensure no multiple slashes
    .replace(/\/$/, ""); // Remove trailing slash if present

  return translatedPath;
}

export function slugWitoutLang<
  T extends CollectionEntry<CollectionKey>["slug"],
>(slug: T) {
  return slug.split("/")[1] as WithoutLang<T>;
}
