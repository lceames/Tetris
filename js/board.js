import block from './blocks/block';

class Board {
  constructor(pieceName) {
    this.grid = this.blankGrid();
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    this.setFallingPiece(pieceName);
  }

  moveFallingPiece() {
    this.fallingPiece = this.fallingPiece.map((pos) => {
      return [pos[0], pos[1] + 1];
    });
  }

  blankGrid() {
    let grid = [];
    let row = [];
    for (let i = 0; i < 12; i++) {
      row.push(Board.EMPTY_SQUARE);
    }
    for (let i = 0; i < 20; i++) {
      grid.push(row.slice());
    }
    return grid;
  }

  pieceFallen() {
    this.fallingPiece.forEach( (pos) => {
      if (this.grid[pos[0], pos[1] + 1] !== 0) {
        return true;
      }
    });
    return false;
  }

  setFallingPiece(pieceName) {
    let positions;
    if (pieceName === "square") {
      positions = [[0,0],[0,1],[1,0],[1,1]];
    }
    this.fallingPiece = positions;
  }

  render() {
    let canvas = document.getElementById('board');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 480, 800);
    ctx.strokeRect(0,0, 480, 800);

    this.fallingPiece.forEach( (pos) => {
      block(ctx, pos[0], pos[1], this.fallingPieceColor);
    });

    this.grid.forEach( (row, rowIdx, grid) => {
      row.forEach( (pos, colIdx, row) => {
      });
    });
  }

}

const PIECE_COLORS = {
  "square": "yellow",
};

Board.EMPTY_SQUARE = 0;


export default Board;
