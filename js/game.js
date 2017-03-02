class Game {
  constructor(board) {
    this.board = board;
    setInterval(this.updateBoard.bind(this), 1000)
  }

  updateBoard() {
    this.board.render();
    if (this.board.pieceFallen()) {
      this.board.updateGrid();
      let index = Math.floor(Math.random()*7);
      this.board.setFallingPiece("square");
    }
    else {
      this.board.moveFallingPiece();
    }
  }
}

const PIECES = ["square", "j-block", "l-block", "line", "i-skew", "o-skew", "t-turn"];

export default Game;
