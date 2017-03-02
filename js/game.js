class Game {
  constructor(board) {
    this.board = board;
    setInterval(this.updateBoard.bind(this), 1000)
  }

  updateBoard() {
    if (this.board.pieceFallen) {
      let index = Math.floor(Math.random()*7);
      board.setFallingPiece("square");
    }
    else {
      this.board.moveFallingPiece();
    }
    this.board.render();
  }
}

const PIECES = ["square", "j-block", "l-block", "line", "i-skew", "o-skew", "t-turn"];

export default Game;
