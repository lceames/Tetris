import block from './blocks/block';
import clearBlock from './blocks/clear_block';

class Board {
  constructor(pieceName, ctx) {
    this.grid = this.blankGrid();
    this.ctx = ctx;
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    this.setFallingPiece(pieceName);
    this.pieceFallen = this.pieceFallen.bind(this);
  }

  moveFallingPiece(dir) {
    let self = this;
    this.fallingPiece.forEach( pos => {
      self.ctx.clearRect((pos[0] * 40), (pos[1] * 40), 41, 41);
    });

    this.fallingPiece = this.fallingPiece.map((pos) => {
      if (dir === "down") {
        return [pos[0], pos[1] + 1];
      }
      else if (dir === "right") {
        return [pos[0] + 1, pos[1]];
      }
      else if (dir === "left") {
        return [pos[0] - 1, pos[1]];
      }
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
    let self = this;
    return this.fallingPiece.some( (pos) => {
      return (!self.grid[pos[1] + 1] || self.grid[pos[1] + 1][pos[0]] !== 0)
    });
  }

  updateGrid() {
    this.fallingPiece.forEach( (pos) => {
      this.grid[pos[1]][pos[0]] = this.fallingPieceColor;
    });
  }

  setFallingPiece(pieceName) {
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    if (pieceName === "square") {
      this.setSquare.apply(this);
    }
    else if (pieceName === "line") {
      this.setLine.apply(this);
    }
    else if (pieceName === "t") {
      this.setT.apply(this);
    }
    else if (pieceName === "s") {
      this.setS.apply(this);
    }
    else if (pieceName === "z") {
      this.setZ.apply(this);
    }
    else if (pieceName == "j") {
      this.setJ.apply(this);
    }
    else if (pieceName == "l") {
      this.setL.apply(this);
    }
  }

  setSquare() {
    this.fallingPiece = [[0,0],[0,1],[1,0],[1,1]];
  }

  setLine() {
    this.fallingPiece = [[5,0],[5,1],[5,2],[5,3]];
  }

  setT() {
    this.fallingPiece = [[4,1],[5,1],[6,1],[5,0]];
  }

  setS() {
    this.fallingPiece = [[4,1], [5,1], [5,0], [6,0]];
  }

  setZ() {
    this.fallingPiece = [[4,0], [5,0], [5,1], [6,1]];
  }

  setL() {
    this.fallingPiece = [[5,0], [5,1], [5,2], [6,2]];
  }

  setJ() {
    this.fallingPiece = [[5,0], [5,1], [5,2], [4,2]];
  }

  render() {
    this.fallingPiece.forEach( (pos) => {
      block(this.ctx, pos[0], pos[1], this.fallingPieceColor, false);
    });
  }

}

const PIECE_COLORS = {
  "square": "yellow",
  "line": "cyan",
  "t": "purple",
  "s": "green",
  "z": "red",
  "j": "blue",
  "l": "orange"
};

Board.EMPTY_SQUARE = 0;


export default Board;
