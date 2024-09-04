import { reference, z } from "astro:content";
import type { SchemaContext } from "astro:content";

/* Helper Schemas */
export const ExternalSourceSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const OptinalExternalSourceSchema = ExternalSourceSchema.partial({
  url: true,
});

/* Content Collection Schemas */
export const AuthorSchema = ({ image }: SchemaContext) =>
  z.object({
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    avatar: image().optional(),
  });

export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  author: reference("authors"),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export const WorkExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  author: reference("authors"),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export const NewsArticleSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(["draft", "published"]).default("draft"),
    publishedAt: z.date(),
    cover: image().optional(),
    source: ExternalSourceSchema,
    tags: z.array(z.string()).optional(),
  });

export const ProjectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.enum(["draft", "published"]).default("draft"),
  authors: z.array(reference("authors")),
  externalAuthors: z.array(OptinalExternalSourceSchema).optional(),
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
  externalAuthors: z.array(OptinalExternalSourceSchema).optional(),
  cite: z.string(),
  links: z.array(ExternalSourceSchema).optional(),
  tags: z.array(z.string()).optional(),
});

/* Type Definitions */
export type ExternalSource = z.infer<typeof ExternalSourceSchema>;
export type OptinalExternalSource = z.infer<typeof OptinalExternalSourceSchema>;
export type Author = z.infer<ReturnType<typeof AuthorSchema>>;
export type Education = z.infer<typeof EducationSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type NewsArticle = z.infer<ReturnType<typeof NewsArticleSchema>>;
export type Project = z.infer<typeof ProjectSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
