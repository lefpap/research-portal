# Content Authoring Guide

This guide contains examples of how to add and maintain structured content in Research Portal.

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


