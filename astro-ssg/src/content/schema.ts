import { reference, z } from "astro:content";

export const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  description: z.string(),
  start: z.date(),
  end: z.date().optional(),
  current: z.boolean().optional().default(false),
});

export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  start: z.date(),
  end: z.date().optional(),
  description: z.string(),
});

export const ExternalAuthorSchema = z.object({
  fullname: z.string(),
  url: z.string().url().optional(),
});

export const ExternalLinkSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const AuthorSchema = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  avatar: z.string().default("/images/avatar-placeholder.png"),
  experience: z.array(ExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
});

export const ArticleSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.date(),
  coverImage: z.string().default("/images/post-placeholder.png"),
  source: ExternalLinkSchema,
  tags: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.enum(["draft", "published"]).default("draft"),
  authors: z.array(reference("authors")),
  externalAuthors: z.array(ExternalAuthorSchema).optional(),
  tags: z.array(z.string()).optional(),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
});

export const PublicationSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.date(),
  authors: z.array(reference("authors")),
  externalAuthors: z.array(ExternalAuthorSchema).optional(),
  cite: z.string(),
  doi: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ExternalAuthor = z.infer<typeof ExternalAuthorSchema>;
export type ExternalLink = z.infer<typeof ExternalLinkSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
