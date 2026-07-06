import rss from "@astrojs/rss";
import { getPublished } from "../utils/content";
import {
  SITE_TITLE,
  SITE_DESCRIPTION_DEVANAGRI,
  SITE_TITLE_DEVANAGRI,
  SITE_DESCRIPTION,
  SITE_TITLE_SEPARATOR,
  DEFAULT_ARTICLE_IMAGE,
} from "../utils/consts";

export async function GET(context) {
  const [posts, articles] = await Promise.all([
    getPublished("page"),
    getPublished("articles"),
  ]);

  const pageItems = posts.map((post) => ({
    title: `${post.data.titleEnglish} ${SITE_TITLE_SEPARATOR} ${post.data.titleDevanagri}`,
    description: post.data.description,
    pubDate: post.data.pubDate,
    categories: post.data.tags,
    link: `/page/${post.slug}/`,
  }));

  const articleItems = articles.map((article) => ({
    title:
      article.data.title ||
      article.data.titleEnglish ||
      article.data.titleDevanagri ||
      article.slug,
    description: article.data.description,
    pubDate: article.data.pubDate,
    categories: article.data.tags,
    link: `/articles/${article.slug}/`,
  }));

  const items = [...pageItems, ...articleItems].sort(
    (a, b) => (b.pubDate?.valueOf() ?? 0) - (a.pubDate?.valueOf() ?? 0)
  );

  return rss({
    title: `${SITE_TITLE} ${SITE_TITLE_SEPARATOR} ${SITE_TITLE_DEVANAGRI}`,
    description: `${SITE_DESCRIPTION} ${SITE_TITLE_SEPARATOR} ${SITE_DESCRIPTION_DEVANAGRI}`,
    site: context.site,
    items,
  });
}
