import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
