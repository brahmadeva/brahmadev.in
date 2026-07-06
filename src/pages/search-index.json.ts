import type { APIRoute } from "astro";
import { getPublished } from "../utils/content";

// Prerendered search index consumed by the search modal (client-side fuzzy
// search). Both Hindi (Devanagari) and English/transliteration titles are
// included per record so a query in either language matches.
const stripHtml = (s?: string) => (s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const GET: APIRoute = async () => {
  const [pages, articles] = await Promise.all([
    getPublished("page"),
    getPublished("articles"),
  ]);

  const records = [
    ...pages.map((p) => ({
      type: "scripture",
      url: `/page/${p.slug}`,
      titleHi: p.data.titleDevanagri || "",
      titleEn: p.data.titleEnglish || "",
      description: stripHtml(p.data.description),
      tags: p.data.tags || [],
    })),
    ...articles.map((a) => ({
      type: "article",
      url: `/articles/${a.slug}`,
      titleHi: a.data.titleDevanagri || "",
      titleEn: a.data.titleEnglish || a.data.title || "",
      description: stripHtml(a.data.description),
      tags: a.data.tags || [],
    })),
  ];

  return new Response(JSON.stringify(records), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
