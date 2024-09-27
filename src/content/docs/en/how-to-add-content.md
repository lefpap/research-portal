---
title: How to Add Content
publishedAt: 2024-09-27
---

## 1. Introduction

Adding content to your website is a straightforward process that involves creating or editing Markdown files. Markdown is a lightweight markup language with plain-text formatting syntax. In this guide, we'll walk you through the steps to add content to your website using Markdown.

## 2. Create a New Markdown File

To add a new page or blog post to your website, you need to create a new Markdown file. You can do this by following these steps:

1. Open your code editor.

2. Open the content directory and find the collection where you want to add the new content. For example, if you want to add a new news article, navigate to the `news` directory, also find the locale you want to add the content to (e.g., `en` for English, `el` for Greek).

3. Create a new file with a `.md` extension (e.g., `my-new-article.md`).

4. Add your content using Markdown syntax.

## 3. Content Schema and Templates

Each collection in your website has a specific schema that defines the structure of the content. For example, a news article may have a title, description, author, and published date. You need to follow the schema and use the appropriate template when adding new content.

### 1. Author

**Schema:**

| Field     | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| firstname | String | ✅       | The name of the author.                                     |
| lastname  | String | ✅       | The surname of the author.                                  |
| email     | String | ✅       | The email address of the author.                            |
| avatar    | Url    | ❌       | The URL of the author's avatar. Make sure it's a valid path |

**Template:**

```yml
---
email: ...
firstname: ...
lastname: ...
# avatar: ...
---
Content goes here...
```

### 2. News Article

**Schema:**

| Field       | Type                            | Required | Description                               |
| ----------- | ------------------------------- | -------- | ----------------------------------------- |
| title       | String                          | ✅       | The title of the news article.            |
| summary     | String                          | ✅       | A brief summary of the news article.      |
| author      | Author                          | ✅       | The author reference of the news article. |
| publishedAt | Date                            | ✅       | The publication date of the news article. |
| source      | Object {name: string, url: Url} | ✅       | The source URL of the news article.       |
| status      | Enum {draft, published} (draft) | ❌       | The status of the news article.           |
| cover       | Url                             | ❌       | The cover image of the news article.      |
| tags        | Array of Strings                | ❌       | The tags associated with the news article |

**Template:**

```yml
---
title: ...
summary: ...
author: "el/maria-ioannou"
publishedAt: 2024-09-27
source:
  name: ...
  url: ...
# status: ...
# cover: ...
# tags:
#   - test
---
Content goes here...
```

### 3. Project

**Schema:**

| Field           | Type                                       | Required | Description                          |
| --------------- | ------------------------------------------ | -------- | ------------------------------------ |
| title           | String                                     | ✅       | The title of the project.            |
| summary         | String                                     | ✅       | A brief summary of the project.      |
| authors         | Array of Authors                           | ✅       | The authors of the project.          |
| externalAuthors | Array of Objects {name: string, url?: Url} | ❌       | The external authors of the project. |
| status          | Enum {draft, published} (draft)            | ❌       | The status of the project.           |
| tags            | Array of Strings                           | ❌       | The tags associated with the project |
| repo            | Url                                        | ❌       | The URL of the project repository.   |
| demo            | Url                                        | ❌       | The URL of the project demo.         |

**Template:**

```yml
---
title: ...
summary: ...
authors:
  - ...
# externalAuthors:
#   - name: "Dr. John Smith"
#     url: "https://example.com/john-smith"
# status: ...
# tags:
#   - test
# repo: ...
# demo: ...
---
Content goes here...
```

### 4. Publication

**Schema:**

| Field           | Type                                       | Required | Description                               |
| --------------- | ------------------------------------------ | -------- | ----------------------------------------- |
| title           | String                                     | ✅       | The title of the publication.             |
| authors         | Array of Authors                           | ✅       | The authors of the publication.           |
| externalAuthors | Array of Objects {name: string, url?: Url} | ❌       | The external authors of the publication.  |
| publishedAt     | Date                                       | ✅       | The publication date of the publication.  |
| cite            | String                                     | ✅       | The bibtex citation of the publication.   |
| status          | Enum {draft, published} (draft)            | ❌       | The status of the publication.            |
| links           | Array of Objects {name: string, url: Url}  | ❌       | The links associated with the publication |
| tags            | Array of Strings                           | ❌       | The tags associated with the publication  |

**Template:**

```yml
---
title: ...
summary: ...
publishedAt: ...
authors:
  - ...
cite: | ...
# externalAuthors:
#   - name: ...
#     url: ...
# status: ...
# links:
#   - name: ...
#     url: ...
# tags:
#   - test
---
Content goes here...
```

### 5. Education

**Schema:**

| Field       | Type   | Required | Description                            |
| ----------- | ------ | -------- | -------------------------------------- |
| degree      | String | ✅       | The degree of the education.           |
| institution | String | ✅       | The institution of the education.      |
| author      | Author | ✅       | The author reference of the education. |
| startDate   | Date   | ✅       | The start date of the education.       |
| endDate     | Date   | ❌       | The end date of the education.         |

**Template:**

```yml
---
author: ...
degree: ...
institution: ...
startDate: ...
# endDate: ...
---
Content goes here...
```

### 6. Work Experience

**Schema:**

| Field     | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| title     | String | ✅       | The title of the work experience.       |
| company   | String | ✅       | The company of the work experience.     |
| author    | Author | ✅       | The author reference of the experience. |
| startDate | Date   | ✅       | The start date of the experience.       |
| endDate   | Date   | ❌       | The end date of the experience.         |

**Template:**

```yml
---
author: ...
title: ...
company: ...
startDate: ...
# endDate: ...
---
Content goes here...
```

### 7. Other Pages (Legal, Docs, etc.)

**Schema:**

| Field       | Type                            | Required | Description                       |
| ----------- | ------------------------------- | -------- | --------------------------------- |
| title       | String                          | ✅       | The title of the page.            |
| publishedAt | Date                            | ✅       | The publication date of the page. |
| status      | Enum {draft, published} (draft) | ❌       | The status of the page.           |

**Template:**

```yml
---
title: ...
publishedAt: ...
# status: ...
---
Content goes here...
```
