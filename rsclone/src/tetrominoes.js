/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import { TETROMINOES, COLORS, COLS } from './constants';

export default class Tetromino {
  constructor(context) {
    this.context = context;
    this.tetrominoOrder = [];
    this.tetrominoName = this.extractTetromino();
    this.tetrominoObj = this.getNextTetromino();
  }

  drawTetromino() {
    const gradient = this.context.createLinearGradient(15, 0, 5, 20);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, this.color);
    this.context.fillStyle = gradient;

    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillRect(this.col + x, this.row + y, 0.97, 0.97);
        }
      });
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  extractTetromino() {
    const order = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
    const randomIndex = this.getRandomInt(0, order.length - 1);
    return order[randomIndex];
  }

  getNextTetromino() {
    this.shape = TETROMINOES[this.tetrominoName];
    this.color = COLORS[this.tetrominoName];
    this.col = COLS / 2 - Math.round(this.shape[0].length / 2);
    this.row = 0;

    return {
      tetrominoName: this.tetrominoName,
      shape: this.shape,
      color: this.color,
      row: this.row,
      col: this.col,
    };
  }

  rotateTetromino() {
    const result = [];
    for (let i = 0; i < this.shape[0].length; i++) {
      const row = this.shape.map((e) => e[i]).reverse();
      result.push(row);
    }
    this.shape = result;
  }
}
