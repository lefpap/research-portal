export const languages = {
  en: "English",
  el: "Ελληνικά",
} as const;

export type Lang = keyof typeof languages;

export const showDefaultLang = true;
export const defaultLang = "en";
