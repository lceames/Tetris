import Board from './board';
import nextPiece from './blocks/next_piece';

class Game {
  constructor(ctx) {
    this.boardCanvas = ctx;
    this.welcomeText.call(this);
    $(document).keydown( this.handleKeydown.bind(this));
    this.playNextPiece = this.playNextPiece.bind(this);
    this.playGame = this.playGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.incrementScore.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.gameOverText = this.gameOverText.bind(this);
  }

  welcomeText() {
    this.boardCanvas.font = "24px Times New Roman";
    this.boardCanvas.fillStyle = "white";
    this.boardCanvas.fillText("Welcome To Tetris",88,250);
    this.boardCanvas.fillText("Press 'b' to begin the game",52,280);
  }

  gameOverText() {
    this.boardCanvas.fillStyle = "rgba(0, 0, 21, 1)";
    this.boardCanvas.fillRect(0, 170, 360, 150 );
    this.boardCanvas.font = "46px Times New Roman";
    this.boardCanvas.fillStyle = "red";
    this.boardCanvas.fillText("GAME OVER",42,250);
    this.boardCanvas.font = "24px Times New Roman";
    this.boardCanvas.fillStyle = "white";
    this.boardCanvas.fillText("Press 'b' to begin again",68,280);
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
    else if (e.keyCode == 40 && !this.board.pieceFallen("falling")) {
      this.board.moveFallingPiece('down');
    }
    else if (e.keyCode === 38) {
      this.board.rotateFallingPiece('left');
    }
    else if (e.keyCode == 32) {
      this.board.dropFallingPiece();
      clearInterval(this.interval);
      setTimeout( this.resetTimer.bind(this), this.levelSpeed/2);
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
    else if (e.keyCode === 66 && this.gameOver !== false) {
      this.beginGame();
    }
    if (this.board) {
      this.board.render();
    }
  }

  resetTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(this.updateBoard.bind(this), this.levelSpeed);
    this.updateBoard.apply(this);
  }

  beginGame() {
    if (this.interval) { clearInterval(this.interval); }
    this.gameOver = false;
    this.boardCanvas.fillStyle = "rgba(0, 0, 21, 1)";
    this.boardCanvas.fillRect(0, 0, 360, 600);
    this.currentPiece = this.randomPiece.apply(this);
    this.board = new Board(this.currentPiece, this.boardCanvas);
    this.nextPiece = this.randomPiece.apply(this);
    this.levelSpeed = 500;
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
    if (this.board.pieceFallen("falling")) {
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
    this.board.clearFallingFromCanvas();
    this.board.updateFallingInGrid(Board.EMPTY_SQUARE);
    if (this.savedPiece) {
      this.board.setFallingPiece(this.savedPiece);
      this.savedPiece = this.currentPiece;
    }
    else {
      this.savedPiece = this.currentPiece;
      this.board.setFallingPiece(this.nextPiece);
      this.nextPiece = this.randomPiece();
      this.paintNextPiece();
      this.board.updateFallingInGrid('falling');
    }
    this.paintSavedPiece();
  }

  nextLevel() {
    this.levelsIndex += 1;
    this.levelSpeed = Math.floor(500 / (this.levelsIndex + 0.1));
    clearInterval(this.interval);
    this.interval = setInterval(this.updateBoard.bind(this), this.levelSpeed);
  }

  playNextPiece() {
    this.board.updateFallingInGrid(this.board.fallingPieceColor);
    this.board.shadow = null;
    let eliminatedLineCount = this.board.eliminateFullLines();
    this.incrementScore(eliminatedLineCount);
    this.board.setFallingPiece(this.nextPiece);
    if (this.board.gameOver(this.nextPiece)) {
      clearInterval(this.interval);
      this.gameOver = true;
      this.gameOverText();
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
  0: 500,
  1: 1000,
  2: 3000,
  3: 5000,
  4: 8000,
  5: 12000,
  6: 15000,
  7: 18000,
  8: 25000,
  9: 35000,
  10: 50000
};

const PIECES = ["square", "j", "l", "line", "s", "z", "t"];

export default Game;
