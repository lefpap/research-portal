import { defineCollection } from "astro:content";
import {
  AuthorSchema,
  EducationSchema,
  NewsArticleSchema,
  ProjectSchema,
  PublicationSchema,
  WorkExperienceSchema,
  SimplePageSchema,
} from "@/content/schema";

const authors = defineCollection({
  type: "content",
  schema: AuthorSchema,
});

const education = defineCollection({
  type: "content",
  schema: EducationSchema,
});

const workExperience = defineCollection({
  type: "content",
  schema: WorkExperienceSchema,
});

const news = defineCollection({
  type: "content",
  schema: NewsArticleSchema,
});

const projects = defineCollection({
  type: "content",
  schema: ProjectSchema,
});

const publications = defineCollection({
  type: "content",
  schema: PublicationSchema,
});

const legal = defineCollection({
  type: "content",
  schema: SimplePageSchema,
});

const docs = defineCollection({
  type: "content",
  schema: SimplePageSchema,
});

export const collections = {
  authors,
  education,
  "work-experience": workExperience,
  news,
  projects,
  publications,
  legal,
  docs,
};
