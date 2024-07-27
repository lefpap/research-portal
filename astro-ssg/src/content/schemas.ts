import { defineCollection, reference, z } from "astro:content";

export const authors = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      email: z.string().email(),
      firstname: z.string(),
      lastname: z.string(),
      bio: z.string(),
      avatar: z.string().default("/images/avatar-placeholder.png"),
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

export const news = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      status: z.enum(["draft", "published"]).default("draft"),
      publishedAt: z.date(),
      coverImage: z.string().default("/images/post-placeholder.png"),
      source: z.object({
        url: z.string().url(),
        name: z.string(),
      }),
      author: reference("authors"),
      tags: z.array(z.string()).optional(),
    }),
});

export const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["draft", "published"]),
    author: reference("authors"),
    tags: z.array(z.string()).optional(),
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
    tags: z.array(z.string()).optional(),
    contributors: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    doi: z.string().url().optional(),
    pdf: z.string().url().optional(),
  }),
});
