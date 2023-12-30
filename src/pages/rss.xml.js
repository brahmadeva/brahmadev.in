import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import {
  SITE_TITLE,
  SITE_DESCRIPTION_DEVANAGRI,
  SITE_TITLE_DEVANAGRI,
  SITE_DESCRIPTION,
  SITE_TITLE_SEPARATOR,
  DEFAULT_ARTICLE_IMAGE,
} from "../consts";

export async function GET(context) {
  const posts = await getCollection("page");
  return rss({
    title: `${SITE_TITLE} ${SITE_TITLE_SEPARATOR} ${SITE_TITLE_DEVANAGRI}`,
    description: `${SITE_DESCRIPTION} ${SITE_TITLE_SEPARATOR} ${SITE_DESCRIPTION_DEVANAGRI}`,
    site: context.site,
    items: posts.map((post) => ({
      // ...post.data,
      title: `${post.data.titleEnglish} ${SITE_TITLE_SEPARATOR} ${post.data.titleDevanagri}`,
      description: post.data.description,
      pubDate: post.data.pubDate,
      //  image: post.data.heroImage ? post.data.heroImage : DEFAULT_ARTICLE_IMAGE,
      categories: post.data.tags,
      link: `/page/${post.slug}/`,
    })),
  });
}
