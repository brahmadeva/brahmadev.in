import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

const mappings = {
  

};

// https://astro.build/config
export default defineConfig({
  site: "https://brahmadev.in",
  redirects: {
    "/page": "/",
    "/pages": "/",
    ...Object.keys(mappings).map((key) => ({
      [key]: mappings[key],
      [`${key}/amp/`]: mappings[key],
    })),
  },
  integrations: [react(), mdx(), tailwind(), sitemap()],
});
