# Research Portal

## Table of Contents

1. [🚀 Installation and Setup](#-installation-and-setup)
   - [Prerequisites](#prerequisites)
   - [Installation Steps](#installation-steps)
   - [Optional: Configure VSCode](#optional-configure-vscode)
     - [Extensions](#extensions)
2. [🧞 Commands](#-commands)
3. [🛠️ Project Structure](#️-project-structure)
   - [Root Directory](#root-directory)
   - [Public Directory](#public-directory)
   - [Source Directory (src)](#source-directory-src)
   - [Configuration Files](#configuration-files)
4. [📝 Writing Content](#-writing-content)
   - [Front Matter](#front-matter)
   - [Markdown Content](#markdown-content)
   - [Content Collections](#content-collections)
   - [Collection Schemas](#collection-schemas)
     - [Adding an Author](#adding-an-author)
     - [Adding a News Article](#adding-a-news-article)
     - [Adding a Publication](#adding-a-publication)
     - [Adding a Project](#adding-a-project)
5. [📦 Project Stack](#-project-stack)

## 🚀 Installation and Setup

### Prerequisites

Make sure you have the following installed on your device:

- [Node.js](https://nodejs.org/en/download/) (v18 or newer)
- [npm](https://www.npmjs.com/get-npm) (npm comes with Node.js)

### Installation Steps

1. Clone the repository

   ```sh
   git clone https://github.com/lefpap/research-portal.git
   cd <repository-directory>
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Start the development server

   ```sh
   npm run dev
   ```

   This will start a development server and you can view the website at <http://localhost:4321>. Any changes made to the files will automatically refresh the browser.

### Optional: Configure VSCode

#### Extensions

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) (for Astro syntax highlighting)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (for Tailwind CSS support)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  To format code automatically on save, add the following settings to your VSCode settings:

  ```json
  {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "prettier.documentSelectors": ["**/*.astro"],
    "[astro]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }
  ```

  Make also sure you have the `.prettierrc` file in the root of the project with the following content:

  ```json
  {
    "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
    "overrides": [
      {
        "files": "*.astro",
        "options": {
          "parser": "astro"
        }
      }
    ]
  }
  ```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🛠️ Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public
│   ├── favicon.svg
│   ├── icons
│   └── js
├── src
│   ├── components
│   ├── content
│   ├── context
│   ├── env.d.ts
│   ├── hooks
│   ├── i18n
│   ├── layouts
│   ├── lib
│   ├── pages
│   └── styles
├── tailwind.config.mjs
├── tsconfig.json
├── astro.config.mjs
├── remark-reading-time.mjs
├── components.json
├── package-lock.json
└── package.json
```

### Root Directory

- **README.md**: Contains the project's documentation, including an overview, setup instructions, usage, and any other relevant information for developers and users.
- **astro.config.mjs**: The main configuration file for the Astro project, specifying settings and options for the static site generator.
- **components.json**: A configuration file related to Shadcn, which is used for defining and managing UI components.
- **package-lock.json**: Automatically generated file that locks the versions of dependencies installed via npm, ensuring consistent installs across different environments.
- **package.json**: Defines the project's dependencies, scripts, and metadata. It is essential for managing the Node.js project and its packages.

### Public Directory

- **public**: Contains static assets that will be directly served without processing by Astro.
  - **favicon.svg**: The website's favicon, displayed in the browser tab.
  - **icons**: Directory for icon files used throughout the site.
  - **js**: Directory for JavaScript files that are directly served to the client.

> Any static assets, like images, can be placed in the `public/` directory.

### Source Directory (src)

- **src**: Main source folder where all development takes place.
  - **components**: Contains reusable UI components for the project.
  - **content**: Stores Markdown or other content files used for generating pages or posts.
  - **context**: Contains context providers for managing state and passing data through the component tree.
  - **env.d.ts**: TypeScript declaration file for environment variables, ensuring type safety for env variables used in the project.
  - **hooks**: Custom hooks for reusing stateful logic across components.
  - **layouts**: Layout components that wrap around page components to provide consistent structure and styling.
  - **lib**: Utility functions and libraries that are used throughout the project.
  - **pages**: Each file here represents a route in your website. Contains page components that correspond to different routes.
  - **styles**: Global CSS or other style files for the project.

### Configuration Files

- **remark-reading-time.mjs**: A module that calculates and displays the estimated reading time for Markdown content.
- **tailwind.config.mjs**: Configuration file for Tailwind CSS, specifying customizations and theme settings for the project's styles.
- **tsconfig.json**: Configuration file for TypeScript, specifying compiler options and project settings for TypeScript integration.

> Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

## 📝 Writing Content

Content for the site can be written in Markdown files, which are stored in the `src/content/` directory. These files can include front matter metadata and content written in Markdown syntax.

### Front Matter

Front matter is a block of YAML or JSON at the beginning of a Markdown file that contains metadata about the content. It is enclosed by `---` or `+++` delimiters.

Example front matter:

```yaml
# src/content/post/sample-post.md
---
title: "Sample Post"
date: "2022-01-01"
author: "John Doe"
tags:
  - Astro
  - Markdown
---
```

### Markdown Content

After the front matter, you can write the content of the post in Markdown syntax. This can include headings, paragraphs, lists, code blocks, images, and more.

Example Markdown content:

```markdown
# Sample Post

This is a sample post written in Markdown.

## Subheading

Here's a list of items:

- Item 1
- Item 2
- Item 3
```

### Content Collections

Content collections are groups of related content that can be used to generate multiple pages or posts. Each collection is defined in the `src/content/config.ts` file.

In the `src/content/schema.ts` file, you can define the schema for the content collections, including the front matter fields and content structure.

### Collection Schemas

There are 4 types of content schemas that are defined in the `src/content/schema.ts`:

1. **Authors**: Represents a collection of authors that can be associated with posts or articles.
2. **News**: Represents a collection of news articles.
3. **Projects**: Represents a collection of projects or portfolio items.
4. **Publications**: Represents a collection of publications or academic papers.

### Adding an Author

To add an author, you can create a new Markdown file in the `src/content/authors/` directory. The file should include front matter with the author's name and other relevant information defined in the schema.

Example author file:

```yaml
# john-doe.md
---
firstname: "John"
lastname: "Doe"
avatar: "/images/authors/john-doe.jpg"
experience:
  - title: "Software Engineer"
    company: "Tech Corp"
    description: "Working on cutting-edge technologies."
    start: 2018
    end: null # null or leave empty for present
education:
  - degree: "Bachelor of Science"
    institution: "University of Tech"
    description: "Major in Computer Science."
    start: 2014
    end: 2018
---
Write a short bio or description of the author here using markdown.
```

### Adding a News Article

To add a news article, create a new Markdown file in the `src/content/news/` directory.

Example news article file:

```yaml
title: "New Science Discovery"
summary: "A summary of the news article."
status: "published" # draft or published
publishedAt: "2022-01-01"
coverImage: "/images/news/science-discovery.jpg"
source:
  - name: "Science News"
    url: "https://sciencenews.com"
tags:
  - Science
  - Discovery
---
Write the content of the news article here using markdown.
```

### Adding a Publication

To add a publication or academic paper, create a new Markdown file in the `src/content/publications/` directory.

Example publication file:

```yaml
title: "Research Paper Title"
summary: "A summary of the research paper."
status: "published" # draft or published
publishedAt: "2022-01-01"
authors:
  - "john-doe" # use the filename of the author to reference
externalAuthors:
  - fullname: "Jane Smith"
    url: "https://example.com/jane-smith" # optional URL for external authors if they have a personal page
cite: | # BibTeX citation
  @article{
     ...
  }
doi: "https://doi.org/10.1234/5678" # DOI link
tags:
  - Research
  - Paper
---
Write the content of the publication here using markdown.
```

### Adding a Project

To add a project or portfolio item, create a new Markdown file in the `src/content/projects/` directory.

Example project file:

```yaml
title: "Project Title"
summary: "A summary of the project."
status: "published" # draft or published
authors:
  - "john-doe" # use the filename of the author to reference
externalAuthors:
  - fullname: "Jane Smith"
    url: "https://example.com/jane-smith" # optional URL for external authors if they have a personal page
repo: https://some-repo.com # optional URL to the project repository
demo: https://project-demo.com # optional URL to the project demo
tags:
  - Project
  - Demo
---
Write the content of the project here using markdown.
```

> Make sure to add the images or other assets referenced in the content files to the `public/images/` directory.

## 📦 Project Stack

- [Astro](https://astro.build): Used as the static site generator for building modern websites with a focus on performance and developer experience.
- [TypeScript](https://www.typescriptlang.org): Used for typesafe JavaScript development.
- [React](https://reactjs.org): Used to build the interactive UI components of the website.
- [Tailwind CSS](https://tailwindcss.com): Used for styling the website with utility-first CSS classes.
- [Shadcn](https://ui.shadcn.com/): UI librarry that is used for components and design system.
