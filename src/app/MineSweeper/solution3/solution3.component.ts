import {CommonModule} from '@angular/common';
import {Component,OnInit} from '@angular/core';

// Represents the state of each button (tile) on the grid.
interface TileState {
  state: number; // state: -1 = mine, 0 = empty, 1-8 surrounding mine 
  isRevealed: boolean; // has been revealed (clicked) and visible
  color: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-solution3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let x of grid" class="wrapper">
      <button
        *ngFor="let y of x"
          [ngStyle]="{
            width: button_size + 'px',
            height: button_size + 'px',
            color: y.color,
            opacity: y.isRevealed ? '0.3' : '1'
          }"
        class="button"
        (click)="button_click(y)"
      >
        {{ y.isRevealed ? y.state : '' }}
      </button>
    </div>
  `,
  styles: [`
    .wrapper { display: flex; }
    .button { margin: 1px; }
  `]
})
export class Solution3Component implements OnInit {
  // Breadth-First Search (BFS) (Queue-based) algorithm
  // Approach: Explores all immediate neighbors of each tile first before moving on to the next level.
  // In BFS, we use a queue to track tiles to be revealed, processing each level of neighbors before moving on to the next.

// How BFS Works for Minesweeper
// 1) When click an empty tile (with state = 0), it's added to a queue.
// BFS repeatedly removes the first tile from the queue, reveals it, and checks its neighbors.
// If any neighbor is also empty (state = 0) and hasn’t been revealed, it’s added to the queue to be revealed later, creating a cascading effect.

  grid_x = 10;
  grid_y = 10;
  button_size = 25;
  number_of_mines = 10;
  grid: TileState[][] = [];

  readonly COLORS: { [key: number]: string } = {
    0: 'black',
    1: 'green',
    2: 'blue',
    3: 'purple',
    4: 'blue',
    5: 'lilac',
    6: 'yellow',
    7: 'orange',
    8: 'orange'
  };

  ngOnInit(): void {
    this.createGrid();
    this.placeMines();
    this.calculateMineCounts();
  }

   /**
   * Initializes the grid with default TileState values, setting each tile's initial state.
   */
  private createGrid(): void {
    for (let x = 0; x < this.grid_x; x++) {
      const grid_row: TileState[] = [];
      for (let y = 0; y < this.grid_y; y++) {
        grid_row.push({
          state: 0,
          isRevealed: false,
          color: 'black',
          x,
          y
        });
      }
      this.grid.push(grid_row);
    }
  }

  /**
   * Randomly places a specified number of mines across the grid.
   */
  private placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.number_of_mines) {
      const x = Math.floor(Math.random() * this.grid_x);
      const y = Math.floor(Math.random() * this.grid_y);
      if (this.grid[x][y].state !== -1) {
        this.grid[x][y].state = -1;  // Set mine indicator
        this.grid[x][y].color = 'red'; // Color for mines
        minesPlaced++;
      }
    }
  }

  /**
  * Calculates the number of mines surrounding each tile that is not a mine
  * and updates each tile's state accordingly.
  */
  private calculateMineCounts(): void {
    for (let x = 0; x < this.grid_x; x++) {
      for (let y = 0; y < this.grid_y; y++) {
        if (this.grid[x][y].state === -1) continue;
        this.grid[x][y].state = this.countAdjacentMines(x, y);
        this.grid[x][y].color = this.COLORS[this.grid[x][y].state];
      }
    }
  }

  /**
   * Counts the number of adjacent mines for a given tile based on its coordinates.
   * @param x X-coordinate of the tile
   * @param y Y-coordinate of the tile
   * @returns The number of adjacent mines around the tile
   */  
  private countAdjacentMines(x: number, y: number): number {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < this.grid_x && ny >= 0 && ny < this.grid_y) {
          if (this.grid[nx][ny].state === -1) {
            count++;
          }
        }
      }
    }
    return count;
  }

/**
 * Handles the button click event. Reveals the tile and initiates the
 * reveal process if the tile is empty (state of 0).
 * @param state The state of the clicked tile
 */  
  button_click(state: TileState): void {
    if (state.isRevealed || state.state === -1) {
      if (state.state === -1) alert("YOU LOST");
      return;
    }
    this.revealTiles(state);
  }

/**
 * Reveals the selected tile and uses a queue to perform a breadth-first search
 * to reveal all connected, non-mine tiles starting from this point.
 * @param state The initial tile state to start revealing from
 */  
  private revealTiles(state: TileState): void {
    const visited = new Set<string>();       // Tracks visited tiles
    const queue: TileState[] = [state];    // Queue for BFS

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = `${current.x},${current.y}`;

      if (visited.has(key) || current.isRevealed) continue; // Skip already processed tiles

      current.isRevealed = true; // Mark as revealed
      visited.add(key);          // Add to visited

      // If the tile has no adjacent mines, add its neighbors to the queue
      if (current.state === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const nx = current.x + dx;
            const ny = current.y + dy;
            if (nx >= 0 && nx < this.grid_x && ny >= 0 && ny < this.grid_y) {
              const neighbor = this.grid[nx][ny];
              if (!neighbor.isRevealed && neighbor.state !== -1) {
                queue.push(neighbor);
              }
            }
          }
        }
      }
    }
  }
  
}
