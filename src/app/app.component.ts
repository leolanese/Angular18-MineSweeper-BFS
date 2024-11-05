import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Solution1Component} from "./MineSweeper/solution1/solution1.component";
import {Solution2Component} from "./MineSweeper/solution2/solution2.component";
import {Solution3Component} from './MineSweeper/solution3/solution3.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    Solution1Component, 
    Solution2Component,
    Solution3Component
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
/**
This minesweeper game is implemented using a 2D grid of tiles, where each tile is an object that holds information about its state 
(whether it's a mine or how many mines are nearby). 

Mines are randomly placed across the grid, and the adjacent mine counts are calculated for each tile.

When a tile is clicked, it reveals itself; if it's empty (not a mine and with no nearby mines), a breadth-first search (BFS) 
is used to reveal neighboring empty tiles, creating the cascading effect seen in minesweeper.

BFS algorithms is managed with a queue to keep track of tiles that need to be revealed in order. If a mine is clicked, the game ends.
 * 
 */
export class AppComponent {
  title = 'Angular18-MineSweeper';
}
