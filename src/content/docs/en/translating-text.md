---
title: Translating Text
publishedAt: 2020-09-27
status: published
---

## 1. Introduction

This guide will show you how to translate text in the app.

## 2. Steps

1. Locate the `translations` folder inside `src/config/`. This folder will contain subfloders foreach language supported by the app (Eg. `/en`, `/el` etc).

2. Inside each language folder, you will find json files that contain the translations for the app. Open the file for the language you want to translate.

3. Find the text you want to translate and replace the value with the translated text.

This is how the json file looks like:

```json
// `/src/config/translations/el/page.json`
{
  "page.home.title": "Διαβάστε τα τελευταία νέα και την έρευνα στην επιστήμη των υπολογιστών",
  "page.home.subtitle": "Μείνετε ενήμεροι με τα τελευταία νέα και την έρευνα στην επιστήμη των υπολογιστών.",
  "page.home.button.team": "Γνωρίστε την Ομάδα",
  "page.home.heading.latest-news": "Τελευταία Νέα",
  "page.home.text.empty-news": "Δεν υπάρχουν νέα για εμφάνιση.",
  "page.home.button.news": "Διαβάστε όλα τα νέα",
  "page.home.heading.featured-projects": "Έργα",
  "page.home.text.empty-projects": "Δεν υπάρχουν έργα για εμφάνιση.",
  "page.home.button.projects": "Προβολή όλων των έργων",
  "page.home.heading.featured-publications": "Έρευνες",
  "page.home.text.empty-publications": "Δεν υπάρχουν έρευνες για εμφάνιση.",
  "page.home.button.publications": "Προβολή όλων των ερευνών",
  ...
}
```

> You can locate the text inside the code by searching for the key. For example, to find the text for the `page.home.title` key, you can search for `page.home.title`.
