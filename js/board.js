import block from './blocks/block';
import clearBlock from './blocks/clear_block';

class Board {
  constructor(pieceName, ctx) {
    this.pieceFallen = this.pieceFallen.bind(this);
    this.moveFallingPiece = this.moveFallingPiece.bind(this);
    this.eliminateFullLines = this.eliminateFullLines.bind(this);
    this.clearShadowFromCanvas = this.clearShadowFromCanvas.bind(this);
    this.shiftPositions = this.shiftPositions.bind(this);
    this.updateFallingPos = this.updateFallingPos.bind(this);

    this.grid = this.blankGrid();
    this.ctx = ctx;
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    this.currentPiece = pieceName;
    this.setFallingPiece(pieceName);
    this.updateFallingInGrid("falling");
    this.setShadowPositions();
  }

  moveFallingPiece(dir) {
    this.updateFallingInGrid(Board.EMPTY_SQUARE);
    this.clearFallingFromCanvas();
    this.clearShadowFromCanvas();
    this.updateFallingPos(dir, "falling");
    this.setShadowPositions();
    this.updateFallingInGrid("falling");
  }

  setShadowPositions() {
    this.shadow = this.fallingPiece.map( pos => [pos[0], pos[1]] );
    while(!this.pieceFallen("shadow")) {
      this.updateFallingPos("down", "shadow");
    }
  }

  shiftPositions(positions, dir) {
    return positions.map( pos => {
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

  updateFallingPos(dir, type) {
    let positionObject;
    if (type === "falling") {
      this.fallingPiece = this.shiftPositions(this.fallingPiece, dir);
    }
    else {
      this.shadow = this.shiftPositions(this.shadow, dir);
    }

    if (dir === "down" && type === "falling") {
      this.rotationAxis = [this.rotationAxis[0], this.rotationAxis[1] + 1];
    }
    else if (dir === "left" && type === "falling") {
      this.rotationAxis = [this.rotationAxis[0] - 1, this.rotationAxis[1]];
    }
    else if (dir === "right" && type === "falling") {
      this.rotationAxis = [this.rotationAxis[0] + 1, this.rotationAxis[1]];
    }
  }

  clearFallingFromCanvas() {
    let self = this;
    this.fallingPiece.forEach( pos => {
      self.ctx.clearRect((pos[0] * 30), (pos[1] * 30), 31, 31);
      self.ctx.fillStyle = "rgba(0, 0, 21, 1)";
      self.ctx.fillRect((pos[0] * 30), (pos[1] * 30), 31, 31);
    });
  }

  clearShadowFromCanvas() {
    if (this.shadow) {
      this.shadow.forEach( pos => {
        block(this.ctx, pos[0], pos[1], "rgba(0, 0, 21, 1)");
      });
    }
  }


  dropFallingPiece() {
    while (!this.pieceFallen("falling")) {
      this.moveFallingPiece("down");
    }
  }

  rotateFallingPiece(direction) {
    let { minX, maxX, minY, maxY} = this.matrixCoordinates.apply(this);
    let matrix = this.getMatrixFromFalling(minX, maxX, minY, maxY);
    if (matrix.length === 0 || this.matrixContainsFallenPiece(matrix)) {
      return;
    }
    this.clearFallingFromCanvas();
    this.clearShadowFromCanvas();
    this.updateFallingInGrid(Board.EMPTY_SQUARE);
    this.setFallingFromMatrix.call(this, matrix, minX, minY);
    this.updateFallingInGrid("falling");
    this.setShadowPositions();
  }

  matrixContainsFallenPiece(matrix) {
    return matrix.some( row => {
      if (row.some( el => (el !== 1 && el !== "falling"))) {
        return true;
      }
    });
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
      if ((minX === undefined) || pos[0] < minX) { minX = pos[0]; }
      if ((maxX === undefined) || pos[0] > maxX) { maxX = pos[0]; }
      if ((minY === undefined) || pos[1] < minY) { minY = pos[1]; }
      if ((maxY === undefined) || pos[1] > maxY) { maxY = pos[1]; }
    });

    let matrixRange = (maxX - minX) > (maxY - minY) ? maxX - minX: maxY - minY;
    minX = Math.round(this.rotationAxis[0] - (matrixRange/2));
    maxX = Math.round(this.rotationAxis[0] + (matrixRange/2));
    minY = Math.round(this.rotationAxis[1] - (matrixRange/2));
    maxY = Math.round(this.rotationAxis[1] + (matrixRange/2));

    if (minY < 0 || minX < 0 || maxY > 20 || maxX > 11) {
      return [];
    }

    return { minX, maxX, minY, maxY};
  }

  getMatrixFromFalling(minX, maxX, minY, maxY) {
    let matrix = this.grid.slice(minY, maxY + 1).map( (row) => {
      return row.slice(minX, maxX + 1);
    });

    matrix.forEach( row => {
      row.forEach( coord => {
        if (coord != 1 && coord != "falling") {
          return [];
        }
      });
    });


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

  eliminateFullLines() {
    let lineCount = 0;
    this.grid.forEach( (row,idx) => {
      if (row.every( coord => coord !== 1 )) {
        lineCount += 1;
        this.eliminateLine(idx);
      }
    });
    this.paintCanvas();
    return lineCount;
  }

  paintCanvas() {
    this.ctx.clearRect(0, 0, 360, 600);
    this.ctx.fillStyle = "rgba(0, 0, 21, 0.95)";
    this.ctx.fillRect(0, 0, 360, 600);
    this.grid.forEach( (row, rowIdx) => {
      row.forEach( (coord, colIdx) => {
        if (coord !== 1) {
          block(this.ctx, colIdx, rowIdx, coord, false);
        }
      });
    });
  }

  eliminateLine(idx) {
    for (idx; idx > 0; idx--) {
      this.grid[idx] = this.grid[idx - 1].slice();
    }
  }

  pieceFallen(type) {
    let pieceObject;
    if (type === "falling") {
      pieceObject = this.fallingPiece;
    }
    else {
      pieceObject = this.shadow;
    }
    let self = this;
    return pieceObject.some( (pos) => {
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

  gameOver() {
    return this.fallingPiece.some( coord => {
      if (this.grid[coord[1]][coord[0]] !== 1) {
        return true;
      }
    });
  }

  setFallingPiece(pieceName) {
    this.currentPiece = pieceName;
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    if (pieceName === "square") {
      this.rotationAxis = [4.5,0.5];
      this.fallingPiece = [[4,0],[4,1],[5,0],[5,1]];
    }
    else if (pieceName === "line") {
      this.rotationAxis = [5.5,1.5];
      this.fallingPiece = [[5,0],[5,1],[5,2],[5,3]];
    }
    else if (pieceName === "t") {
      this.rotationAxis = [5,1];
      this.fallingPiece = [[4,1],[5,1],[6,1],[5,0]];
    }
    else if (pieceName === "s") {
      this.rotationAxis = [5,1];
      this.fallingPiece = [[4,1], [5,1], [5,0], [6,0]];
    }
    else if (pieceName === "z") {
      this.rotationAxis = [5,0];
      this.fallingPiece = [[4,0], [5,0], [5,1], [6,1]];
    }
    else if (pieceName == "j") {
      this.rotationAxis = [5,1];
      this.fallingPiece = [[5,0], [5,1], [5,2], [4,2]];
    }
    else if (pieceName == "l") {
      this.rotationAxis = [5,1];
      this.fallingPiece = [[5,0], [5,1], [5,2], [6,2]];
    }
    this.clearShadowFromCanvas();
    this.setShadowPositions();
  }

  render() {
    if (this.shadow) {
      this.shadow.forEach( (pos, idx) => {
        block(this.ctx, pos[0], pos[1], "gray");
      });
    }

    this.fallingPiece.forEach( (pos) => {
      block(this.ctx, pos[0], pos[1], this.fallingPieceColor);
    });
  }

}

const PIECE_COLORS = {
  "square": "rgb(244, 228, 4)",
  "line": "rgb(4, 244, 228)",
  "t": "rgb(228, 4, 244)",
  "s": "rgb(20, 244, 4)",
  "z": "rgb(244, 4, 20)",
  "j": "rgb(244, 108, 4)",
  "l": "rgb(4, 20, 244)"
};

Board.EMPTY_SQUARE = 1;


export default Board;
