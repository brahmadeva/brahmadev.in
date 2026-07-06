import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// The sitemap is a hand-rolled dynamic endpoint (src/pages/sitemap.xml.ts)
// so drafts are honored via getPublished(); the @astrojs/sitemap integration
// is intentionally not used to avoid a second, competing sitemap.
export default defineConfig({
  site: "https://brahmadev.in",
  redirects: {
    "/page": "/",
    "/pages": "/",
  },
  integrations: [mdx(), tailwind()],
});
