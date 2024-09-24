export const languages = {
  en: "English",
  el: "Ελληνικά",
} as const;

export type Lang = keyof typeof languages;

export const showDefaultLang = true; // not supported yet
export const defaultLang = "el" as const;
