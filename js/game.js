import Board from './board';
import block from './blocks/block';

class Game {
  constructor(ctx) {
    this.board = new Board(this.randomPiece.apply(this), ctx);
    this.nextPiece = this.randomPiece.apply(this);
    this.startGame.apply(this);
    // this.nextPieceCanvas = document.getElementById('next-piece').getContext('2d');
    // this.paintNextPiece.apply(this);
    $(document).keydown( this.handleKeydown.bind(this));
    this.playNextPiece = this.playNextPiece.bind(this);
    this.startGame = this.startGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
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
    else if (e.keyCode == 32) {
      this.board.dropFallingPiece();
      this.playNextPiece();
    }
    else if (e.keyCode === 80) {
      if (this.paused) {
        this.startGame();
      }
      else {
        this.pauseGame();
      }
    }
    this.board.render();
  }

  startGame() {
    this.interval = setInterval(this.updateBoard.bind(this), 500);
    this.paused = false;
  }

  pauseGame() {
    clearInterval(this.interval);
    this.paused = true;
  }

  updateBoard() {
    if (this.board.pieceFallen()) {
      this.playNextPiece();
    }
    else {
      this.board.moveFallingPiece("down");
    }
    this.board.render();
  }

  playNextPiece() {

    this.board.updateFallingInGrid(this.board.fallingPieceColor);
    this.board.eliminateFullLines();
    this.board.setFallingPiece(this.nextPiece);
    if (this.board.gameOver(this.nextPiece)) {
      clearInterval(this.interval);
      return;
    }
    this.nextPiece = this.randomPiece();
    this.board.updateFallingInGrid("falling");
  }
  //
  // paintNextPiece() {
  //   block(this.ctx, 0, 0, this.nextPiece, false);
  // }

  randomPiece() {
    let index = Math.floor(Math.random()*7);
    if (PIECES[index] || !this.board || PIECES[index] !== this.board.currentPiece) {
      return PIECES[index];
    }
    else {
      index = Math.floor(Math.random()*6);
      return PIECES[index];
    }
  }
}

const PIECES = ["square", "j", "l", "line", "s", "z", "t"];

export default Game;
