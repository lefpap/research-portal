import { defineCollection } from "astro:content";
import {
  AuthorSchema,
  ArticleSchema,
  ProjectSchema,
  PublicationSchema,
} from "@/content/schema";

const authors = defineCollection({ type: "content", schema: AuthorSchema });
const news = defineCollection({ type: "content", schema: ArticleSchema });
const projects = defineCollection({ type: "content", schema: ProjectSchema });
const publications = defineCollection({
  type: "content",
  schema: PublicationSchema,
});

export const collections = {
  authors,
  news,
  projects,
  publications,
};
