/* eslint-disable no-plusplus */
import { COLS, ROWS } from './constants';

export default class GameGrid {
  constructor(context) {
    this.context = context;
    this.createGrid();
  }

  createGrid() {
    this.grid = new Array(ROWS);
    for (let row = 0; row < this.grid.length; row++) {
      this.grid[row] = new Array(COLS);
      for (let col = 0; col < this.grid[row].length; col++) {
        this.grid[row][col] = 0;
      }
    }
  }

  drawLastPosition() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = value;
          this.context.fillRect(x, y, 0.97, 0.97);
        }
      });
    });
  }

  clearRow() {
    this.clearlines = 0;
    for (let row = this.grid.length - 1; row >= 0;) {
      if (this.grid[row].every((cell) => !!cell)) {
        this.grid.splice(row, 1);
        this.grid.unshift(Array(COLS).fill(0));
        this.clearlines++;
      } else {
        row--;
      }
    }
    return this.clearlines;
  }
}
