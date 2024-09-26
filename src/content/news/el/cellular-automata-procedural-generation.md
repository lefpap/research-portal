---
title: "Cellular Automata και Procedural Generation"
summary: "Εξερευνώντας πώς τα cellular automata χρησιμοποιούνται στη διαδικαστική δημιουργία περιεχομένου."
status: "published"
author: "el/nikos-papadopoulos"
publishedAt: 2024-05-25
cover: "/src/content/news/_images/cellular-automata-pcg.webp"
source:
  name: "Tech World"
  url: "https://www.techworld.gr/cellular-automata-procedural-generation"
tags:
  - "Cellular Automata"
  - "PCG"
---

## Περίληψη

Τα cellular automata είναι υπολογιστικά μοντέλα που αποτελούνται από ένα πλέγμα κυψελών, καθεμία από τις οποίες μπορεί να βρίσκεται σε μια πεπερασμένη κατάσταση. Χρησιμοποιούνται ευρέως στη διαδικαστική δημιουργία περιεχομένου (procedural generation) σε παιχνίδια και προσομοιώσεις.

## Τι είναι τα Cellular Automata

Ένα cellular automata αποτελείται από:

- **Πλέγμα Κυψελών:** Μια δισδιάστατη ή τρισδιάστατη διάταξη.
- **Καταστάσεις:** Κάθε κυψέλη μπορεί να έχει μία από πολλές πιθανές καταστάσεις.
- **Κανόνες Μετάβασης:** Καθορίζουν πώς η κατάσταση μιας κυψέλης αλλάζει με βάση τις γειτονικές της κυψέλες.

## Παράδειγμα Κώδικα: Υλοποίηση του "Game of Life" σε Python

Το "Game of Life" του John Conway είναι ένα από τα πιο γνωστά παραδείγματα κυψελωτών αυτομάτων.

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

def update(data):
    global grid
    newGrid = grid.copy()
    for i in range(N):
        for j in range(N):
            # Υπολογισμός των ζωντανών γειτόνων
            total = int((grid[i, (j-1)%N] + grid[i, (j+1)%N] +
                         grid[(i-1)%N, j] + grid[(i+1)%N, j] +
                         grid[(i-1)%N, (j-1)%N] + grid[(i-1)%N, (j+1)%N] +
                         grid[(i+1)%N, (j-1)%N] + grid[(i+1)%N, (j+1)%N]))
            # Εφαρμογή κανόνων
            if grid[i, j] == 1:
                if total < 2 or total > 3:
                    newGrid[i, j] = 0
            else:
                if total == 3:
                    newGrid[i, j] = 1
    mat.set_data(newGrid)
    grid = newGrid
    return [mat]

# Διαστάσεις πλέγματος
N = 50

# Αρχικοποίηση πλέγματος τυχαία
grid = np.random.choice([0, 1], N*N, p=[0.7, 0.3]).reshape(N, N)

fig, ax = plt.subplots()
mat = ax.matshow(grid, cmap='binary')

ani = animation.FuncAnimation(fig, update, interval=200, save_count=50)
plt.show()
```

_Επεξήγηση:_

- **Βιβλιοθήκες:** Χρησιμοποιούμε numpy για τον χειρισμό του πλέγματος και matplotlib για την οπτικοποίηση.
- **Συνάρτηση update:** Υπολογίζει την επόμενη γενιά του πλέγματος.
- **Κανόνες του Game of Life:**
  - Μια ζωντανή κυψέλη με 2 ή 3 ζωντανούς γείτονες παραμένει ζωντανή.
  - Μια νεκρή κυψέλη με ακριβώς 3 ζωντανούς γείτονες γίνεται ζωντανή.
- **Εκτέλεση Προγράμματος:** Δημιουργεί μια κινούμενη απεικόνιση της εξέλιξης του πλέγματος.

## Procedural Generation με Κυψελωτά Αυτόματα

Τα κυψελωτά αυτόματα χρησιμοποιούνται στη δημιουργία τυχαίων χαρτών, σπηλαίων και άλλων περιβαλλόντων σε παιχνίδια.

_Παράδειγμα:_

1. Ξεκινάμε με ένα τυχαίο πλέγμα.
2. Εφαρμόζουμε κανόνες για να δημιουργήσουμε φυσικά μοτίβα.
3. Το αποτέλεσμα είναι ένα περιβάλλον που φαίνεται χειροποίητο αλλά δημιουργήθηκε αυτόματα.

_Πλεονεκτήματα:_

- Αυτοματοποίηση: Μειώνει τον χρόνο σχεδιασμού.
- Επαναληψιμότητα: Μπορούμε να αναπαράγουμε το ίδιο αποτέλεσμα με τον ίδιο αρχικό σπόρο.
- Ποικιλία: Δημιουργεί μοναδικά περιβάλλοντα κάθε φορά.
