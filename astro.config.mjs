import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

const mappings = {
  "/rss/": "/rss.xml",

  "/shri-brahma-kavacham/":
    "/page/shri-brahma-kavacham-from-mahanirvan-tantra/",
  "/shri-brahmadev-stuti/": "/page/brahmadeva-stuti/",
  "/shri-brahma-ashtottarshat-namavali/":
    "/page/shri-brahma-ashtottarshat-namavali/",
  "/shri-gayatri-ashtottarshat-namavali/":
    "/page/shri-gayatri-ashtottarshat-namavali/",
  "/shri-saraswati-ashtottarshat-namavali/":
    "/page/shri-saraswati-ashtottarshat-namavali/",
  "/shri-gayatri-sahastranama-stotram/":
    "/page/shri-gayatri-sahastranama-stotram/",
  "/shri-brahma-stuti-maheshwar-tantrargata/":
    "/page/shri-brahma-stuti-maheshwar-tantrargata/",
  "/diva-krut-shri-brahma-stuti-kalikapuran-antargat/":
    "/page/deva-krit-shri-brahma-stuti-kalikapuran-antargat/",
  "/deva-krit-shri-brahma-stuti-matsya-puran-antargat/":
    "/page/deva-krit-shri-brahma-stuti-matsya-puran-antargat/",
  "/deva-krit-brahma-storam-skanda-puran-antargat/":
    "/page/deva-krit-brahma-storam-skanda-puran-antargat/",
  "/shri-brahma-stotram-shimad-bhagvat-puran-antargat/":
    "/page/shri-brahma-stotram-shimad-bhagvat-puran-antargat/",
  "/brhmstotrm/": "/page/brahma-stotram-evam-pancharatna-storam/",
  "/shri-brahma-stotram/": "/page/shri-brahma-stotram/",
  "/shri-brahma-suktam/": "/page/shri-brahma-suktam/",
  "/shri-saraswati-stotram/": "/page/shri-saraswati-stotram/",
  "/shri-gayatri-stotram-devi-bhagvat-puran-antargata/":
    "/page/shri-gayatri-stotram-devi-bhagvat-puran-antargata/",
  "/shri-saraswati-giti/": "/page/shri-saraswati-giti/",
  "/shri-gayatri-kavacham/": "/page/shri-gayatri-kavach/",
  "/shri-saraswati-kavacham-devi-bhagvat-puran-antargat/":
    "/page/shri-saraswati-kavacham-devi-bhagvat-puran-antargat/",
  "/vishnukrut-brahma-stava/": "/page/vishnukrut-brahma-stava/",
  "/rudra-mahadev-krut-brahma-kavach-padmapuran-antargat/":
    "/page/rudra-mahadev-krut-brahma-kavach-padmapuran-antargat/",
  "/narada-krit-shri-brahma-stuti-padmapuran-antargat/":
    "/page/narada-krit-shri-brahma-stuti-padmapuran-antargat/",
  "/maharshi-vyas-krit-shri-brahma-stuti-vayu-puran-antargat/":
    "/page/maharshi-vyas-krit-shri-brahma-stuti-vayu-puran-antargat/",
};

const newRedirects = {};

Object.keys(mappings).forEach((key) => {
  newRedirects[key] = mappings[key];
  newRedirects[`${key}amp/`] = mappings[key];
});


// https://astro.build/config
export default defineConfig({
  site: "https://brahmadev.in",
  redirects: {
    "/page": "/",
    "/pages": "/",
    ...newRedirects,
  },
  integrations: [react(), mdx(), tailwind(), sitemap()],
});
