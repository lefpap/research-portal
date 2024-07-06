import { defineCollection, reference, z } from "astro:content";

export const authors = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      email: z.string().email(),
      firstname: z.string(),
      lastname: z.string(),
      bio: z.string(),
      avatar: image().or(z.string().url()),
      experience: z
        .array(
          z.object({
            title: z.string(),
            company: z.string(),
            description: z.string(),
            start: z.date(),
            end: z.date().or(z.string().nullable()),
            current: z.boolean().optional().default(false),
          }),
        )
        .optional(),
      education: z
        .array(
          z.object({
            degree: z.string(),
            institution: z.string(),
            start: z.date(),
            end: z.date(),
            description: z.string(),
          }),
        )
        .optional(),
    }),
});

export const articles = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      status: z.enum(["draft", "published"]),
      publisedAt: z.date(),
      coverImage: image(),
      author: reference("authors"),
      contributors: z.array(z.string()).optional(),
    }),
});

export const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["draft", "published"]),
    author: reference("authors"),
    contributors: z.array(z.string()).optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

export const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["draft", "published"]),
    publishedAt: z.date(),
    author: reference("authors"),
    contributors: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    doi: z.string().url().optional(),
    pdf: z.string().url().optional(),
  }),
});
