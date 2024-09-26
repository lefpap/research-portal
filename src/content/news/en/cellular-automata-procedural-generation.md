---
title: "Cellular Automata and Procedural Generation"
summary: "Exploring how cellular automata are used in procedural content generation."
status: "published"
author: "en/nikos-papadopoulos"
publishedAt: 2024-05-25
cover: "/src/content/news/_images/cellular-automata-pcg.webp"
source:
  name: "Tech World"
  url: "https://www.techworld.com/cellular-automata-procedural-generation"
tags:
  - "Cellular Automata"
  - "PCG"
---

## Summary

Cellular automata are computational models consisting of a grid of cells, each of which can be in a finite number of states. They are widely used in procedural content generation in games and simulations.

## What are Cellular Automata?

A cellular automaton consists of:

- **Grid of Cells:** A 2D or 3D array.
- **States:** Each cell can have one of several possible states.
- **Transition Rules:** Define how the state of a cell changes based on its neighboring cells.

## Code Example: Implementing the "Game of Life" in Python

John Conway's "Game of Life" is one of the most well-known examples of cellular automata.

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

def update(data):
    global grid
    newGrid = grid.copy()
    for i in range(N):
        for j in range(N):
            # Count live neighbors
            total = int((grid[i, (j-1)%N] + grid[i, (j+1)%N] +
                         grid[(i-1)%N, j] + grid[(i+1)%N, j] +
                         grid[(i-1)%N, (j-1)%N] + grid[(i-1)%N, (j+1)%N] +
                         grid[(i+1)%N, (j-1)%N] + grid[(i+1)%N, (j+1)%N]))
            # Apply rules
            if grid[i, j] == 1:
                if total < 2 or total > 3:
                    newGrid[i, j] = 0
            else:
                if total == 3:
                    newGrid[i, j] = 1
    mat.set_data(newGrid)
    grid = newGrid
    return [mat]

# Grid size
N = 50

# Initialize grid randomly
grid = np.random.choice([0, 1], N*N, p=[0.7, 0.3]).reshape(N, N)

fig, ax = plt.subplots()
mat = ax.matshow(grid, cmap='binary')

ani = animation.FuncAnimation(fig, update, interval=200, save_count=50)
plt.show()
```

_Explanation:_

- **Libraries:** We use numpy for grid manipulation and matplotlib for visualization.
  Function update: Computes the next generation of the grid.
- **Game of Life Rules:**
  - A live cell with 2 or 3 live neighbors stays alive.
  - A dead cell with exactly 3 live neighbors becomes alive.
- **Running the Program:** Creates an animated visualization of the grid's evolution.

## Procedural Generation with Cellular Automata

Cellular automata are used to generate random maps, caves, and other environments in games.

_Example:_

1. Start with a random grid.
2. Apply rules to create natural patterns.
3. The result is an environment that looks handcrafted but was generated automatically.

_Advantages:_

- Automation: Reduces design time.
- Repeatability: Can reproduce the same result with the same initial seed.
- Variety: Generates unique environments each time.
