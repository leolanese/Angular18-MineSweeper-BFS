# Angular18MineSweeper

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Explanation

This minesweeper game is implemented using a 2D grid of tiles, where each tile is an object that holds information about its state (like whether it’s a mine or how many mines are nearby). Mines are randomly placed across the grid, and the adjacent mine counts are calculated for each tile.

When a tile is clicked, it reveals itself; if it's empty (not a mine and with no nearby mines), a breadth-first search (BFS) is used to reveal neighboring empty tiles, creating the cascading effect seen in minesweeper. This BFS is managed with a queue to keep track of tiles that need to be revealed in order. If a mine is clicked, the game ends.

## Summary of Each Function

`createGrid()`: Initializes the grid with ButtonState objects, setting each tile to its default unrevealed state with state = 0 and a default color of 'black'.

`placeMines()`: Randomly places mines (state -1) on the grid, updating their color to 'red' to indicate mine locations.

`calculateMineCounts()`: For each non-mine tile, calculates the number of surrounding mines and assigns a corresponding color from the COLORS map based on the number of adjacent mines.

`countAdjacentMines()`: Given a tile’s coordinates, counts the number of surrounding tiles containing mines by iterating over a 3x3 area around it.

`button_click()`: Handles tile clicks. If a mine is clicked, it triggers a game-over alert. If the tile is non-mine, it calls revealTiles() to reveal the tile and any connected empty tiles.

`revealTiles()`: Uses BFS with a queue to reveal all connected tiles with no adjacent mines, creating a cascading reveal effect. It processes each tile by checking if it’s a 0 state, then enqueues its neighboring tiles to reveal them as well.

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
