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
      this.board.setFallingPiece("s");
    }
    else {
      this.board.moveFallingPiece("down");
    }
    this.board.render();
  }
}

const PIECES = ["square", "j-block", "l-block", "line", "i-skew", "o-skew", "t-turn"];

export default Game;
