import { getCollection } from "astro:content";

// Single source of truth for "what is published". Anything with `draft: true`
// in its frontmatter is invisible to the whole site: no route, no listings,
// no RSS, no search index. Always query collections through this, never
// through getCollection() directly.
export const getPublished = <C extends "page" | "articles">(collection: C) =>
	getCollection(collection, ({ data }) => !data.draft);
