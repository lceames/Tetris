import Board from './board';
import nextPiece from './blocks/next_piece';

class Game {
  constructor(ctx) {
    $(document).keydown( this.handleKeydown.bind(this));
    this.playNextPiece = this.playNextPiece.bind(this);
    this.playGame = this.playGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.incrementScore.bind(this);
    this.beginGame = this.beginGame.bind(this);
  }

  createModal() {
    let modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('modal open');
        },
        onClose: () => {
          console.log('modal close');
          if (this.paused) {
            this.playGame();
          }
        },
        // beforeClose: function() {
        //     // here's goes some logic
        //     // e.g. save content before closing the modal
        //     return true; // close the modal
        // 	return false; // nothing happens
        // }
    });
    modal.setContent('<div><h1>GAME PAUSED</h1><p>Press "p" or close box to continue</p></div>');

    return modal;

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
    else if (e.keyCode === 38) {
      this.board.rotateFallingPiece('left');
    }
    else if (e.keyCode == 32) {
      this.board.dropFallingPiece();
      this.playNextPiece();
    }
    else if (e.keyCode === 80) {
      if (this.paused) {
        this.UIModal.close();
        this.playGame();
      }
      else {
        this.pauseGame();
      }
    }
    else if (e.keyCode === 83) {
      this.toggleSavedPiece();
    }
    this.board.render();
  }

  beginGame() {
    this.currentPiece = this.randomPiece.apply(this);
    this.board = new Board(this.currentPiece, ctx);
    this.nextPiece = this.randomPiece.apply(this);
    this.levelSpeed = 800;
    this.score = 0;
    this.levelsIndex = 0;
    this.playGame.apply(this);
    this.UIModal = this.createModal.apply(this);
    this.nextPieceCanvas = document.getElementById('next-piece').getContext('2d');
    this.savedPieceCanvas = document.getElementById('saved-piece').getContext('2d');
    this.paintNextPiece.apply(this);
  }

  playGame() {
    this.interval = setInterval(this.updateBoard.bind(this), this.levelSpeed);
    this.paused = false;
  }

  pauseGame() {
    clearInterval(this.interval);
    this.paused = true;
    this.UIModal.open();
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

  incrementScore(lineCount) {
    this.score += (100 * lineCount) * lineCount;
    document.getElementById('score').innerHTML = this.score;
    if (this.score >= LEVEL_THRESHOLDS[this.levelsIndex + 1]) {
      this.nextLevel.apply(this);
    }
  }

  toggleSavedPiece() {
    this.savedPiece = this.currentPiece;
    this.board.clearFallingFromCanvas();
    this.board.updateFallingInGrid(Board.EMPTY_SQUARE);
    if (this.savedPiece) {
      this.board.setFallingPiece(this.savedPiece);
    }
    else {
      this.board.setFallingPiece(this.nextPiece);
      this.nextPiece = this.randomPiece();
      this.paintNextPiece();
      this.board.updateFallingInGrid('falling');
    }
    this.paintSavedPiece();
  }

  nextLevel() {
    this.levelsIndex += 1;
    this.levelSpeed = 8000 / (levelsIndex + 1);
    clearInterval(this.interval);
    setInterval(this.updateBoard.bind(this), this.levelSpeed);
  }

  playNextPiece() {
    this.board.updateFallingInGrid(this.board.fallingPieceColor);
    let eliminatedLineCount = this.board.eliminateFullLines();
    this.incrementScore(eliminatedLineCount);
    this.board.setFallingPiece(this.nextPiece);
    if (this.board.gameOver(this.nextPiece)) {
      clearInterval(this.interval);
      return;
    }
    this.currentPiece = this.nextPiece;
    this.nextPiece = this.randomPiece();
    this.paintNextPiece();
    this.board.updateFallingInGrid("falling");
  }

  paintNextPiece() {
    this.nextPieceCanvas.fillStyle = "rgba(0, 0, 21, 0.95)";
    this.nextPieceCanvas.fillRect(0, 0, 200, 200);
    nextPiece(this.nextPiece, this.nextPieceCanvas);
  }

  paintSavedPiece() {
    this.savedPieceCanvas.fillStyle = "rgba(0, 0, 21, 0.95)";
    this.savedPieceCanvas.fillRect(0, 0, 200, 200);
    nextPiece(this.savedPiece, this.savedPieceCanvas);
  }

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

const LEVEL_THRESHOLDS = {
  0: 0,
  1: 1000,
  2: 2000,
  3: 5000,
  4: 8000,
  5: 12000
};

const PIECES = ["square", "j", "l", "line", "s", "z", "t"];

export default Game;
