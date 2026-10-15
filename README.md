# Research Portal

A research group website built as my university thesis project for a professor and their team. The site provides a place to present **research publications, projects, news, and team members**, with content organized so it can be maintained over time.

Rather than a generic portfolio template, this project was developed for a real academic use case.

## Features

- **Research publications:** Structured publication entries with authors, citation information, DOI links, and other metadata.
- **Projects:** Pages for research projects, contributors, and related links.
- **News:** Articles and updates with publishing status and metadata.
- **Team profiles:** Author and researcher information, with related education and work experience content.
- **Internationalization:** Language-aware routing and localized content support.
- **Content-driven pages:** Astro content collections with schemas for consistent, maintainable entries.

## Tech stack

- **Astro** for content-focused, statically generated pages
- **React and TypeScript** for interactive UI components
- **Tailwind CSS and shadcn/ui components** for styling and reusable interface elements
- **Markdown and Astro content collections** for structured content management

## Getting started

**Prerequisites:** Node.js and npm. Use a Node.js version compatible with the project's dependencies.

```bash
git clone https://github.com/lefpap/research-portal.git
cd research-portal
npm install
npm run dev
```

Open `http://localhost:4321` to view the local development server.

Useful scripts:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check the Astro project and build the static site |
| `npm run preview` | Preview the production build |
| `npm run format:check` | Check formatting with Prettier |

## How it is structured

```text
src/
  components/    Reusable UI components
  content/       Structured research and team content
  i18n/          Internationalization helpers
  layouts/       Shared page layouts
  pages/         File-based Astro routes
  styles/        Global styles
```

Content collections include authors, publications, projects, news, education, work experience, and supporting pages. Each collection uses a schema to keep entries consistent.

For content templates, front matter examples, and instructions on adding articles or publications, see the [Content Authoring Guide](docs/CONTENT_GUIDE.md).

## Background

This website was developed as a thesis project for an academic research team. It explores how a content-focused architecture can make research work easier to present and maintain, while keeping the site lightweight and straightforward to extend.

The repository contains the application source code and instructions for running it locally.
