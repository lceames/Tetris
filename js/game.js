class Game {
  constructor(board) {
    this.board = board;
    setInterval(this.updateBoard.bind(this), 1000)
    $(document).keydown( this.handleKeydown.bind(this));
    board.render();
  }

  handleKeydown(e) {
    if (e.keyCode === 37 && !this.board.onBorder('left')) {
      this.board.removeFallingFromGrid();
      this.board.moveFallingPiece("left");
      this.board.addFallingToGrid();
    }
    else if (e.keyCode === 39 && !this.board.onBorder('right')) {
      this.board.removeFallingFromGrid();
      this.board.moveFallingPiece("right");
      this.board.addFallingToGrid();
    }
    else if (e.keyCode == 40 && !this.board.pieceFallen()) {
      this.board.removeFallingFromGrid();
      this.board.moveFallingPiece('down');
      this.board.addFallingToGrid();
    }
    else if (e.keyCode === 65) {
      this.board.rotateFallingPiece('left');
      this.board.addFallingToGrid();
    }
    else if (e.keyCode === 83) {
      this.board.rotateFallingPiece('right');
      this.board.addFallingToGrid();
    }
    this.board.render();
  }

  updateBoard() {
    this.board.removeFallingFromGrid();
    if (this.board.pieceFallen()) {
      this.board.addFallenToGrid();
      let index = Math.floor(Math.random()*7);
      this.board.setFallingPiece(PIECES[index]);
    }
    else {
      this.board.moveFallingPiece("down");
      this.board.addFallingToGrid();
    }
    this.board.render();
  }
}

const PIECES = ["square", "j", "l", "line", "s", "z", "t"];

export default Game;
