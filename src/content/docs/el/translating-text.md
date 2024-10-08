---
title: Μετάφραση Κειμένου
publishedAt: 2020-09-27
status: published
---

## 1. Εισαγωγή

Ο οδηγός αυτός θα σας δείξει πώς να μεταφράσετε κείμενο στην εφαρμογή.

## 2. Βήματα

1. Εντοπίστε τον φάκελο `translations` μέσα στο `src/config/`. Ο φάκελος αυτός περιέχει υποφακέλους για κάθε γλώσσα που υποστηρίζεται από την εφαρμογή (π.χ. `/en`, `/el` κ.λπ.).

2. Μέσα σε κάθε φάκελο γλώσσας, θα βρείτε αρχεία json που περιέχουν τις μεταφράσεις για την εφαρμογή. Ανοίξτε το αρχείο της γλώσσας που θέλετε να μεταφράσετε.

3. Βρείτε το κείμενο που θέλετε να μεταφράσετε και αντικαταστήστε την τιμή με το μεταφρασμένο κείμενο.

Αυτό είναι ένα παράδειγμα του πώς φαίνεται το αρχείο json:

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

> Μπορείτε να εντοπίσετε το κείμενο στον κώδικα αναζητώντας το αντίστοιχο key. Για παράδειγμα, για να βρείτε το κείμενο για το key `page.home.title`, μπορείτε να αναζητήσετε το `page.home.title`.
