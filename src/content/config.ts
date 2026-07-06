import { defineCollection, z } from 'astro:content';

// A single unit of scripture: one shloka / mantra / name-group, with its
// transliteration and translations. Devanagari (`dev`) is the only required
// field; everything else is optional so a verse can carry as much or as little
// as we have. Line breaks inside any field are written as real newlines and
// rendered with `white-space: pre-line` — no <br/> markup needed.
const verse = z.object({
	// `verse`   — a translatable shloka / mantra / name-group (default)
	// `speaker` — a speaker cue such as "देवा ऊचुः" (no translation expected)
	// `colophon`— a closing/section line such as "॥ इति ... समाप्ता ॥"
	// `heading` — an in-text section title
	role: z.enum(['verse', 'speaker', 'colophon', 'heading']).default('verse'),
	number: z.string().optional(),           // e.g. "६८" / "1" — shown as the verse marker
	dev: z.string(),                          // Devanagari (the original, kept intact)
	iast: z.string().optional(),              // IAST transliteration of `dev`
	en: z.string().optional(),                // English translation
	hi: z.string().optional(),                // Hindi translation
	mr: z.string().optional(),                // Marathi translation
	// Set true while an AI-generated translation still awaits scholarly review.
	needsReview: z.boolean().optional(),
});

const page = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		// Draft pages are excluded from the build entirely (no route, no listings,
		// no RSS, no search index). See src/utils/content.ts → getPublished().
		draft: z.boolean().optional(),

		titleDevanagri: z.string(),
		titleEnglish: z.string(),
		description: z.string().optional(),
		sourceName: z.string().optional(),

		sourceLink : z.string().optional(),
		sourceDescription: z.string().optional(),

		extraInfo: z.string().optional(),

		featured: z.boolean().optional(),

		// New metadata fields
		significance: z.string().optional(),
		benefits: z.string().optional(),
		recitationMethod: z.string().optional(),
		viniyog: z.string().optional(),

		// Structured scripture body. When present, the page renders these verses
		// (Devanagari/IAST script toggle + en/hi/mr translation toggle) instead of
		// the hand-authored HTML markdown body. Vidhi / prose pages omit this and
		// keep using the markdown body.
		verses: z.array(verse).optional(),
		// Which scripts the reader can switch the shloka between, in order.
		// First entry is the default. e.g. ["devanagari", "iast"].
		availableScripts: z.array(z.enum(['devanagari', 'iast'])).optional(),

		availableLanguages: z.array(z.string()).optional(),
		tags: z.array(z.string()).optional(),

		// Transform string to Date object
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
	}),
});

const articles = defineCollection({
	schema: z.object({
		draft: z.boolean().optional(),
		title: z.string().optional(),
		titleDevanagri: z.string().optional(),
		titleEnglish: z.string().optional(),
		description: z.string().optional(),
		author: z.string().optional(),
		category: z.string().optional(),
		featured: z.boolean().optional(),
		pubDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { page, articles };
