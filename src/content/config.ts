import { defineCollection, z } from 'astro:content';

const page = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		titleDevanagri: z.string(),
		titleEnglish: z.string(),
		description: z.string().optional(),
		sourceName: z.string().optional(),
		
		sourceLink : z.string().optional(),
		sourceDescription: z.string().optional(),

		extraInfo: z.string().optional(),

		featured: z.boolean().optional(),

		availableLanguages: z.array(z.string()).optional(),
		tags: z.array(z.string()).optional(),

		// Transform string to Date object
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { page };
