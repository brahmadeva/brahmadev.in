import type { APIRoute } from "astro";
import { getPublished } from "../utils/content";
import { Tags } from "../utils/consts";

// Dynamic sitemap built from the content collections. Drafts are excluded
// automatically because everything goes through getPublished().
const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://brahmadev.in")).href.replace(/\/$/, "");

  const [pages, articles] = await Promise.all([
    getPublished("page"),
    getPublished("articles"),
  ]);

  const staticUrls = ["/", "/tags", "/articles", ...Tags.map((t) => `/tags/${t}`)].map(
    (path) => ({ loc: `${base}${path}` })
  );

  const contentUrls = [
    ...pages.map((p) => ({
      loc: `${base}/page/${p.slug}`,
      lastmod: p.data.pubDate,
    })),
    ...articles.map((a) => ({
      loc: `${base}/articles/${a.slug}`,
      lastmod: a.data.pubDate,
    })),
  ];

  const entries = [...staticUrls, ...contentUrls]
    .map((u) => {
      const lastmod =
        "lastmod" in u && u.lastmod
          ? `<lastmod>${u.lastmod.toISOString().slice(0, 10)}</lastmod>`
          : "";
      return `  <url><loc>${xmlEscape(u.loc)}</loc>${lastmod}</url>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
