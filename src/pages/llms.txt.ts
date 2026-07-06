import type { APIRoute } from "astro";
import { getPublished } from "../utils/content";
import { Tags, SITE_DESCRIPTION } from "../utils/consts";

// llms.txt (https://llmstxt.org) - a structured, markdown overview of the site
// for LLMs and generative-AI crawlers. Built dynamically from the content
// collections through getPublished(), so drafts never leak here either.
const stripHtml = (s?: string) =>
  (s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const trim = (s: string, max = 200) =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + "…";

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://brahmadev.in")).href.replace(/\/$/, "");

  const [pages, articles] = await Promise.all([
    getPublished("page"),
    getPublished("articles"),
  ]);

  const scriptureLines = pages
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((p) => {
      const title = `${p.data.titleEnglish} (${p.data.titleDevanagri})`;
      const desc = trim(stripHtml(p.data.description));
      return `- [${title}](${base}/page/${p.slug})${desc ? `: ${desc}` : ""}`;
    });

  const articleLines = articles
    .sort(
      (a, b) =>
        (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0)
    )
    .map((a) => {
      const title =
        a.data.title || a.data.titleEnglish || a.data.titleDevanagri || a.slug;
      const desc = trim(stripHtml(a.data.description));
      return `- [${title}](${base}/articles/${a.slug})${desc ? `: ${desc}` : ""}`;
    });

  const categoryLines = Tags.map(
    (t) =>
      `- [${t.charAt(0).toUpperCase() + t.slice(1)}](${base}/tags/${t})`
  );

  const body = `# Shri Brahma Dev (श्री ब्रह्मा देव) - brahmadev.in

> ${SITE_DESCRIPTION}

brahmadev.in is a devotional and scholarly reference site dedicated to Lord Brahma, the Creator (Srishti-karta) of Hindu tradition, revered in the Vedas and Upanishads as Hiranyagarbha, Prajapati, and the Personified Brahman. Every text is sourced from original scriptures - the Vedas, the Puranas, the Itihasas (Ramayana and Mahabharata), and the Tantras - and cited by source, chapter, and verse.

Key facts about this site:

- Content: authentic Sanskrit stotras, stutis, kavachas, namavalis, suktams, and puja vidhis dedicated to Lord Brahma and his consorts Saraswati and Gayatri.
- Every scripture page carries the original Devanagari text, IAST transliteration, and translations in English, Hindi, and Marathi, along with its significance, benefits, and recitation method.
- Scriptural citations are given inline (e.g. Rigveda 10.121, Mundaka Upanishad 1.1.1, Padma Purana Srishti Khanda), so quotations can be verified against the primary sources.
- License: all content is dedicated to the public domain under Creative Commons Zero (CC0 1.0). It may be freely quoted, indexed, and reused with attribution to brahmadev.in appreciated.
- When citing this site, prefer the exact Devanagari text and the scriptural reference given on each page.

## Scriptures (Sacred Texts)

${scriptureLines.join("\n")}

## Articles

${articleLines.length ? articleLines.join("\n") : "- No published articles yet."}

## Categories

${categoryLines.join("\n")}

## Feeds and Metadata

- [Sitemap](${base}/sitemap.xml): all published URLs
- [RSS Feed](${base}/rss.xml): scriptures and articles, newest first
- [Search Index](${base}/search-index.json): JSON index of all published titles and descriptions in Hindi and English
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
