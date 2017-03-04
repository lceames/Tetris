import Board from './board';

class Game {
  constructor(board) {
    this.board = board;
    setInterval(this.updateBoard.bind(this), 1000);
    $(document).keydown( this.handleKeydown.bind(this));
    board.render();
  }

  handleKeydown(e) {
    if (e.keyCode === 37 && !this.board.onBorder('left')) {
      this.board.moveFallingPiece("left");
    }
    else if (e.keyCode === 39 && !this.board.onBorder('right')) {
      this.board.moveFallingPiece("right");
    }
    else if (e.keyCode == 40 && !this.board.pieceFallen()) {
      this.board.moveFallingPiece('down');
    }
    else if (e.keyCode === 65) {
      this.board.rotateFallingPiece('left');
    }
    else if (e.keyCode === 83) {
      this.board.rotateFallingPiece('right');
    }
    this.board.render();
  }

  updateBoard() {
    this.board.updateFallingInGrid(Board.EMPTY_SQUARE);
    if (this.board.pieceFallen()) {
      this.board.updateFallingInGrid(this.board.fallingPieceColor);
      let index = Math.floor(Math.random()*7);
      this.board.setFallingPiece(PIECES[index]);
    }
    else {
      this.board.moveFallingPiece("down");
      this.board.updateFallingInGrid("falling");
    }
    this.board.render();
  }
}

const PIECES = ["square", "j", "l", "line", "s", "z", "t"];

export default Game;
