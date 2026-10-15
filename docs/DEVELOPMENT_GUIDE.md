# Development Guide

This guide is for developers setting up, extending, or maintaining Research Portal. For adding researchers, publications, projects, and news, see the [Content Authoring Guide](CONTENT_GUIDE.md).

## Prerequisites

- Node.js and npm. Use a Node.js version compatible with the dependencies in `package.json`.
- Git
- A code editor, such as VS Code

## Local setup

```bash
git clone https://github.com/lefpap/research-portal.git
cd research-portal
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Common commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Run Astro checks and build the production site |
| `npm run preview` | Preview the built site locally |
| `npm run format:check` | Check source formatting with Prettier |
| `npm run astro -- --help` | View Astro CLI options |

Build output is generated in `dist/`.

## Project structure

```text
public/                 Static assets served directly
src/
  components/           Reusable UI elements
  content/              Markdown content and collection definitions
    config.ts           Astro collection registrations
    schema.ts           Content validation schemas
  context/              React context providers
  hooks/                Shared hooks
  i18n/                 Internationalization helpers
  layouts/              Shared page layouts
  lib/                  Reusable utilities
  pages/                Astro routes, including localized pages
  styles/               Global styles
astro.config.mjs        Astro integrations and configuration
tailwind.config.mjs     Tailwind theme and utilities
tsconfig.json           TypeScript configuration
package.json            Dependencies and npm scripts
```

Astro generates pages from files in `src/pages/`. This project also uses language-specific routes under `src/pages/[lang]/`.

## Technology overview

- **Astro** handles routing, static rendering, and content collections.
- **React** provides interactive components where needed.
- **TypeScript** helps maintain type-safe UI and content code.
- **Tailwind CSS** and UI components provide the visual design system.
- **Markdown content collections** separate academic content from page templates.

Content collections are registered in `src/content/config.ts` with schemas imported from `src/content/schema.ts`. They include authors, education, work experience, news, projects, publications, legal, and documentation pages.

## Working with content

Use the [Content Authoring Guide](CONTENT_GUIDE.md) for concrete front matter examples and steps for adding or updating website content.

When editing a collection schema, check existing entries in `src/content/` for compatibility, then run `npm run build` to catch content validation and type errors.

## Recommended VS Code setup

Helpful extensions:

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Optionally enable format on save in your local editor settings:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

The repository includes `.prettierrc` with Astro and Tailwind formatting plugins.

## Before submitting changes

1. Check the updated pages locally with `npm run dev`.
2. Run `npm run build` to catch Astro checks and build errors.
3. Run `npm run format:check` to check formatting.
4. Review both language variants when making changes to localized pages.
5. Verify links, images, and new content metadata.

For a high-level overview of the project, return to the [README](../README.md).
