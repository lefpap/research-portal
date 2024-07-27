import { reference, z } from "astro:content";

export const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  description: z.string(),
  start: z.date(),
  end: z.date().or(z.string().nullable()),
  current: z.boolean().optional().default(false),
});

export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  start: z.date(),
  end: z.date(),
  description: z.string(),
});

export const AuthorSchema = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string(),
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
  source: z.object({
    url: z.string().url(),
    name: z.string(),
  }),
  tags: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published"]).default("draft"),
  author: reference("authors"),
  tags: z.array(z.string()).optional(),
  contributors: z.array(z.string()).optional(),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
});

export const PublicationSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.date(),
  author: reference("authors"),
  tags: z.array(z.string()).optional(),
  contributors: z.array(z.string()).optional(),
  url: z.string().url().optional(),
  doi: z.string().url().optional(),
  pdf: z.string().url().optional(),
});

export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
