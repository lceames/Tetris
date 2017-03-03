import block from './blocks/block';
import clearBlock from './blocks/clear_block';

class Board {
  constructor(pieceName, ctx) {
    this.grid = this.blankGrid();
    this.ctx = ctx;
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    this.setFallingPiece(pieceName);
    this.addFallingToGrid();
    this.pieceFallen = this.pieceFallen.bind(this);
    this.moveFallingPiece = this.moveFallingPiece.bind(this);
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

  rotateFallingPiece(direction) {
    let minX = this.fallingPiece[0][0];
    let maxX = this.fallingPiece[0][0];
    let minY = this.fallingPiece[0][1];
    let maxY = this.fallingPiece[0][1];

    this.fallingPiece.forEach( (pos) => {
      if (pos[0] < minX) { minX = pos[0]; }
      if (pos[0] > maxX) { maxX = pos[0]; }
      if (pos[1] < minY) { minY = pos[1]; }
      if (pos[1] > maxY) { maxY = pos[1]; }
    });

    let matrixLength = (maxX - minX) > (maxY - minY) ? maxX - minX : maxY - minY
    matrixLength += 1;

    let matrix = this.grid.slice(minY, minY + matrixLength).map( (row) => {
      return row.slice(minX, minX + matrixLength);
    });

    let columns = [];

    for (let i = 0; i < matrix.length; i++) {
     columns.push([]);
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
       columns[j].push(matrix[i][j]);
      }
    }

    columns = columns.map( column => column.reverse() )
    let self = this;
    this.fallingPiece.forEach( pos => {
      self.ctx.clearRect((pos[0] * 40), (pos[1] * 40), 41, 41);
    });

    this.removeFallingFromGrid();
    this.fallingPiece = [];
    columns.forEach( (col, rowIdx) => {
      col.forEach( (pos, colIdx) => {
        debugger
      });
    });
    this.render();
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
        debugger
        return true;
      }
      let nextPos = direction === "right" ? self.grid[pos[1]][pos[0] + 1] : self.grid[pos[1]][pos[0] - 1]
      if (nextPos !== 1 && nextPos !== "falling") {
        debugger
        return true;
      }
    });
  }

  addFallingToGrid() {
    this.fallingPiece.forEach( (pos) => {
      this.grid[pos[1]][pos[0]] = "falling";
    });
  }

  addFallenToGrid() {
    this.fallingPiece.forEach( (pos) => {
      this.grid[pos[1]][pos[0]] = this.fallingPieceColor;
    });
  }

  removeFallingFromGrid() {
    this.fallingPiece.forEach( (pos) => {
      this.grid[pos[1]][pos[0]] = 1;
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
  //
  // transposePiece() {
  //   let piece = this.fallingPiece;
  //   let transposed = [];
  //   for (let i = 0; i < piece.length - 1; i++) {
  //     let row = [];
  //     for(let j = 0; j < piece[0].length; j++) {
  //       row.push(piece[j][i]);
  //     }
  //     debugger
  //     transposed.push(row);
  //   }
  //   this.fallingPiece = transposed;
  // }

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
