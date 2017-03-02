class Game {
  constructor(board) {
    this.board = board;
    setInterval(this.updateBoard.bind(this), 1000)
    $(document).keydown( this.handleKeydown.bind(this));
    board.render();
  }

  handleKeydown(e) {
    if (e.keyCode === 37) {
      this.board.moveFallingPiece("left");
    }
    else if (e.keyCode === 39) {
      this.board.moveFallingPiece("right");
    }
    else if (e.keyCode == "40") {
      this.board.moveFallingPiece('down');
    }
    this.board.render();
  }

  updateBoard() {
    if (this.board.pieceFallen()) {
      this.board.updateGrid();
      let index = Math.floor(Math.random()*7);
      debugger
      this.board.setFallingPiece(PIECES[index]);
    }
    else {
      this.board.moveFallingPiece("down");
    }
    this.board.render();
  }
}

const PIECES = ["square", "j", "l", "line", "s", "z", "t"];

export default Game;
