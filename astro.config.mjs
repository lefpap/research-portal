import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defaultLang, languages } from "./src/i18n/config.ts";

const locales = Object.keys(languages);

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  i18n: {
    defaultLocale: defaultLang,
    locales: locales,
    fallback: {
      el: "en",
    },
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
