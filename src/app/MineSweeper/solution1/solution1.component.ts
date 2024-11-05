import {Component} from '@angular/core';


import {CommonModule} from '@angular/common';
import {RouterLink,RouterLinkActive,RouterOutlet} from '@angular/router';

interface TileState {
  // States are
  // number of mines
  // -1 mine
  state: number
  isRevealed: boolean
  color: string

  x: number
  y: number
}

@Component({
  selector: 'app-solution1',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './solution1.component.html',
  styleUrls: ['./solution1.component.scss']
})
export class Solution1Component {
  grid_x = 10
  grid_y = 10
  button_size = 25
  number_of_mines = 10
  grid: TileState[][] = []

  readonly COLORS: { [key: number]: string; } = {
    0: 'black',
    1: 'green',
    2: 'blue',
    3: 'purple',
    4: 'blue',
    5: 'lilac',
    6: 'yellow',
    7: 'orange',
    8: 'orange',
    9: 'orange'
  }


  ngOnInit(): void {
    // Create the grid of items
    for(let x = 0; x < this.grid_x; x++)
    {
      let grid_row: TileState[] = []
      for(let y = 0; y < this.grid_y; y++)
      {
        grid_row.push({
          state: 0,
          isRevealed: false,
          color: 'black',
          x,
          y
        })
      }

      this.grid.push(grid_row)
    }

    // Go through the whole grid and add the mines
    let i = 0
    while(i < this.number_of_mines) {
      // Choose a random spot on the grid
      const point_x = Math.floor(Math.random() * this.grid_x)
      const point_y = Math.floor(Math.random() * this.grid_y)

      if(this.grid[point_x][point_y].state !== -1)
      {
        this.grid[point_x][point_y].state = -1 // Set mine indicator
        this.grid[point_x][point_y].color = 'red' // Color for mines
        i += 1
        console.log("Added a mine to the grid")
      }
    }

    // Go through the grid and figure out how many mines are around each point
    for(let x = 0; x < this.grid_x; x++)
    {
      for(let y = 0; y < this.grid_y; y++)
      {
        // Check all the points around this one to see how many mines there are
        
        if(this.grid[x][y].state !== -1)
        {
          let num_mines = 0
          //top left
          if(this.grid[x - 1]?.[y - 1] && this.grid[x - 1][y - 1].state === -1)
          {
            num_mines += 1
          }

          //top
          if(this.grid[x]?.[y - 1] && this.grid[x][y - 1].state === -1)
          {
            num_mines += 1
          }

          //top right
          if(this.grid[x + 1]?.[y - 1] && this.grid[x + 1][y - 1].state === -1)
          {
            num_mines += 1
          }

          //middle left
          if(this.grid[x - 1]?.[y] && this.grid[x - 1][y].state === -1)
          {
            num_mines += 1
          }

          //middle
          if(this.grid[x]?.[y] && this.grid[x][y].state === -1)
          {
            num_mines += 1
          }

          //middle right
          if(this.grid[x + 1]?.[y] && this.grid[x + 1][y].state === -1)
          {
            num_mines += 1
          }

          //bottom left
          if(this.grid[x - 1]?.[y + 1] && this.grid[x - 1][y + 1].state === -1)
          {
            num_mines += 1
          }

          //bottom
          if(this.grid[x]?.[y + 1] && this.grid[x][y + 1].state === -1)
          {
            num_mines += 1
          }

          //bottom right
          if(this.grid[x + 1]?.[y + 1] && this.grid[x + 1][y + 1].state === -1)
          {
            num_mines += 1
          }

          this.grid[x][y].state = num_mines
          this.grid[x][y].color = this.COLORS[this.grid[x][y].state]
        }
      }
    }
  }

  button_click(state: TileState): void
  {
    if (state.isRevealed) return
    
    this.grid[state.x][state.y].isRevealed = true
  
    // Check if this is a bomb
    if (state.state === -1)
    {
      alert("YOU LOST")
    }

    // Reveal all the adjascent tiles
    this.reveal_tiles(state)
  }

  private reveal_tiles(state: TileState): void {
    if(state.state === -1) return
    const x = state.x
    const y = state.y
    this.grid[x][y].isRevealed = true

    if (state.state !== 0) return
    // Go through all the neighbours checking if they have been revealed and if not reveal them
    //top left
    if(this.grid[x - 1]?.[y - 1]?.isRevealed === false)
    {
      this.reveal_tiles(this.grid[x - 1]?.[y - 1])
    }

    //top
    if(this.grid[x]?.[y - 1]?.isRevealed === false)
    {
      this.reveal_tiles(this.grid[x]?.[y - 1])
    }

    //top right
    if(this.grid[x + 1]?.[y - 1]?.isRevealed === false)
    {
      this.reveal_tiles(this.grid[x + 1]?.[y - 1])
    }

    //middle left
    if(this.grid[x - 1]?.[y]?.isRevealed === false)
    {
      this.reveal_tiles(this.grid[x - 1]?.[y])
    }

    // middle
    if (this.grid[x]?.[y])
    {
      this.reveal_tiles(this.grid[x][y])
    }

    //middle right
    if(this.grid[x + 1]?.[y]?.isRevealed === false)
    {
      this.reveal_tiles(this.grid[x + 1]?.[y])
    }

    //bottom left
    if(this.grid[x - 1]?.[y + 1]?.isRevealed === false)
    {
      this.reveal_tiles(this.grid[x - 1]?.[y + 1])
    }

    //bottom
    if(this.grid[x]?.[y + 1]?.isRevealed === false)
    {
      this.reveal_tiles(this.grid[x]?.[y + 1])
    }

    //bottom right
    if(this.grid[x + 1]?.[y + 1]?.isRevealed === false)
    {
      this.reveal_tiles(this.grid[x + 1]?.[y + 1])
    }
  }
}