import block from './blocks/block';
import clearBlock from './blocks/clear_block';

class Board {
  constructor(pieceName, ctx) {
    this.grid = this.blankGrid();
    this.ctx = ctx;
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    this.setFallingPiece(pieceName);
    this.updateFallingInGrid("falling");
    this.pieceFallen = this.pieceFallen.bind(this);
    this.moveFallingPiece = this.moveFallingPiece.bind(this);
  }

  moveFallingPiece(dir) {
    this.updateFallingInGrid(Board.EMPTY_SQUARE);
    this.clearFallingFromCanvas();
    this.updateFallingPos(dir);
    this.updateFallingInGrid("falling");
  }

  updateFallingPos(dir) {
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

  clearFallingFromCanvas() {
    let self = this;
    this.fallingPiece.forEach( pos => {
      self.ctx.clearRect((pos[0] * 40), (pos[1] * 40), 41, 41);
    });
  }

  rotateFallingPiece(direction) {
    this.clearFallingFromCanvas();
    let { minX, maxX, minY, maxY } = this.matrixCoordinates.apply(this);
    let matrix = this.getMatrixFromFalling(minX, maxX, minY, maxY);
    this.updateFallingInGrid(Board.EMPTY_SQUARE);
    this.setFallingFromMatrix.call(this, matrix, minX, minY);
    this.updateFallingInGrid("falling");
  }

  setFallingFromMatrix(matrix, minX, minY) {
    this.fallingPiece = [];
    matrix.forEach( (row, rowIdx) => {
      row.forEach( (pos, colIdx) => {
        if (pos === "falling") {
          this.fallingPiece.push([minX + colIdx, minY + rowIdx]);
        }
      });
    });
  }

  matrixCoordinates() {
    let minX, maxX, minY, maxY;

    this.fallingPiece.forEach( (pos) => {
      if ((!minX) || pos[0] < minX) { minX = pos[0]; }
      if ((!maxX) || pos[0] > maxX) { maxX = pos[0]; }
      if ((!minY) || pos[1] < minY) { minY = pos[1]; }
      if ((!maxY) || pos[1] > maxY) { maxY = pos[1]; }
    });

    return { minX, maxX, minY, maxY };
  }

  getMatrixFromFalling(minX, maxX, minY, maxY) {
    let matrixLength = (maxX - minX) > (maxY - minY) ? maxX - minX : maxY - minY;
    matrixLength += 1;
    // let diff = Math.floor(matrixLength/2)
    // let midPointX = minX + diff;
    // let midPointY = minY + diff;
    // debugger

    let matrix = this.grid.slice(minY, minY + matrixLength).map( (row) => {
      return row.slice(minX, minX + matrixLength);
    });
    // debugger
    let transposed = [];

    for (let i = 0; i < matrix.length; i++) {
     transposed.push([]);
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
       transposed[j].push(matrix[i][j]);
      }
    }

    transposed = transposed.map( column => column.reverse() );
    debugger
    return transposed;
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
      if (!self.grid[pos[1] + 1]) { return true; }
      let nextPos = self.grid[pos[1] + 1][pos[0]];
      if (nextPos !== 1 && nextPos !== "falling") {
        return true;
      }
    });
  }

  onBorder(direction) {
    let self = this;
    return this.fallingPiece.some( (pos) => {
      if ((direction === "right" && pos[0] === 11) || (direction === "left" && pos[0] === 0)) {
        return true;
      }
      let nextPos = direction === "right" ? self.grid[pos[1]][pos[0] + 1] : self.grid[pos[1]][pos[0] - 1];
      if (nextPos !== 1 && nextPos !== "falling") {
        return true;
      }
    });
  }

  updateFallingInGrid(fallingState) {
    this.fallingPiece.forEach( (pos) => {
      this.grid[pos[1]][pos[0]] = fallingState;
    });
  }

  setFallingPiece(pieceName) {
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    if (pieceName === "square") {
      this.fallingPiece = [[4,0],[4,1],[5,0],[5,1]];
    }
    else if (pieceName === "line") {
      this.fallingPiece = [[5,0],[5,1],[5,2],[5,3]];
    }
    else if (pieceName === "t") {
      this.fallingPiece = [[4,1],[5,1],[6,1],[5,0]];
    }
    else if (pieceName === "s") {
      this.fallingPiece = [[4,1], [5,1], [5,0], [6,0]];
    }
    else if (pieceName === "z") {
      this.fallingPiece = [[4,0], [5,0], [5,1], [6,1]];
    }
    else if (pieceName == "j") {
      this.fallingPiece = [[5,0], [5,1], [5,2], [4,2]];
    }
    else if (pieceName == "l") {
      this.fallingPiece = [[5,0], [5,1], [5,2], [6,2]];
    }
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

Board.EMPTY_SQUARE = 1;


export default Board;
