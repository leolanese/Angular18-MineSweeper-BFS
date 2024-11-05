import {Component} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {RouterLink,RouterLinkActive,RouterOutlet} from '@angular/router';

interface ButtonState {
  state: number; // -1 for mine, otherwise number of surrounding mines
  isRevealed: boolean;
  color: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-solution2',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Solution2Component {
  // Depth-First Search (DFS) Stack-based
  // This approach uses stack rather than a queue
  // Prioritizes going as deep as possible along a path before backtracking, hence why a stack is used.
  grid_x = 10
  grid_y = 10
  button_size = 25
  number_of_mines = 10
  grid: ButtonState[][] = []

  readonly COLORS: { [key: number]: string; } = {
    0: 'black',
    1: 'green',
    2: 'blue',
    3: 'purple',
    4: 'blue',
    5: 'lilac',
    6: 'yellow',
    7: 'orange',
    8: 'orange'
  }

  ngOnInit(): void {
    this.createGrid();
    this.placeMines();
    this.calculateMineCounts();
  }

   private createGrid(): void {
    for (let x = 0; x < this.grid_x; x++) {
      const grid_row: ButtonState[] = [];
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

    private placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.number_of_mines) {
      const x = Math.floor(Math.random() * this.grid_x);
      const y = Math.floor(Math.random() * this.grid_y);
      if (this.grid[x][y].state !== -1) {
        this.grid[x][y].state = -1;
        this.grid[x][y].color = 'red';
        minesPlaced++;
      }
    }
  }

  private calculateMineCounts(): void {
    for (let x = 0; x < this.grid_x; x++) {
      for (let y = 0; y < this.grid_y; y++) {
        if (this.grid[x][y].state === -1) continue;
        this.grid[x][y].state = this.countAdjacentMines(x, y);
        this.grid[x][y].color = this.COLORS[this.grid[x][y].state];
      }
    }
  }

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

  button_click(state: ButtonState): void {
    if (state.isRevealed || state.state === -1) {
      if (state.state === -1) alert("YOU LOST");
      return;
    }
    this.revealTiles(state);
  }

  private revealTiles(state: ButtonState): void {
    const visited = new Set<string>();
    const revealStack: ButtonState[] = [state];

    while (revealStack.length > 0) {
      const current = revealStack.pop()!;
      const key = `${current.x},${current.y}`;

      if (visited.has(key) || current.isRevealed) continue;

      current.isRevealed = true;
      visited.add(key);

      if (current.state === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const nx = current.x + dx;
            const ny = current.y + dy;
            if (nx >= 0 && nx < this.grid_x && ny >= 0 && ny < this.grid_y) {
              const neighbor = this.grid[nx][ny];
              if (!neighbor.isRevealed && neighbor.state !== -1) {
                revealStack.push(neighbor);
              }
            }
          }
        }
      }
    }
  }

}