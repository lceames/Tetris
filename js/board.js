class Board {
  constructor(pieceName) {
    this.staticPieces = [];
    this.fallingPiece = placeFallingPiece(pieceName);
    this.grid = blankGrid();
  }

  pullFallingPiece(pieceName) {
    this.fallingPiece.forEach((pos) => [pos[0], pos[1] + 1])
  }

  blankGrid() {

  }

  placeFallingPiece() {
    
  }

  render() {

  }

}

Board.EMPTY_SQUARE = 0;


export default Board;
