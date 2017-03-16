/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var block = function block(ctx, x, y, color, size) {
  x = x * 30 + 1;
  y = y * 30 + 1;
  size = 29;
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.fillRect(x, y, size, size);
  ctx.strokeRect(x, y, size, size);
};

exports.default = block;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(0);

var _block2 = _interopRequireDefault(_block);

var _clear_block = __webpack_require__(3);

var _clear_block2 = _interopRequireDefault(_clear_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(pieceName, ctx) {
    _classCallCheck(this, Board);

    this.pieceFallen = this.pieceFallen.bind(this);
    this.moveFallingPiece = this.moveFallingPiece.bind(this);
    this.eliminateFullLines = this.eliminateFullLines.bind(this);
    this.clearShadowFromCanvas = this.clearShadowFromCanvas.bind(this);
    this.shiftPositions = this.shiftPositions.bind(this);
    this.updateFallingPos = this.updateFallingPos.bind(this);

    this.grid = this.blankGrid();
    this.ctx = ctx;
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    this.currentPiece = pieceName;
    this.setFallingPiece(pieceName);
    this.updateFallingInGrid("falling");
    this.setShadowPositions();
  }

  _createClass(Board, [{
    key: 'moveFallingPiece',
    value: function moveFallingPiece(dir) {
      this.updateFallingInGrid(Board.EMPTY_SQUARE);
      this.clearFallingFromCanvas();
      this.clearShadowFromCanvas();
      this.updateFallingPos(dir, "falling");
      this.setShadowPositions();
      this.updateFallingInGrid("falling");
    }
  }, {
    key: 'setShadowPositions',
    value: function setShadowPositions() {
      this.shadow = this.fallingPiece.map(function (pos) {
        return [pos[0], pos[1]];
      });
      while (!this.pieceFallen("shadow")) {
        this.updateFallingPos("down", "shadow");
      }
    }
  }, {
    key: 'shiftPositions',
    value: function shiftPositions(positions, dir) {
      return positions.map(function (pos) {
        if (dir === "down") {
          return [pos[0], pos[1] + 1];
        } else if (dir === "right") {
          return [pos[0] + 1, pos[1]];
        } else if (dir === "left") {
          return [pos[0] - 1, pos[1]];
        }
      });
    }
  }, {
    key: 'updateFallingPos',
    value: function updateFallingPos(dir, type) {
      var positionObject = void 0;
      if (type === "falling") {
        this.fallingPiece = this.shiftPositions(this.fallingPiece, dir);
      } else {
        this.shadow = this.shiftPositions(this.shadow, dir);
      }

      if (dir === "down" && type === "falling") {
        this.rotationAxis = [this.rotationAxis[0], this.rotationAxis[1] + 1];
      } else if (dir === "left" && type === "falling") {
        this.rotationAxis = [this.rotationAxis[0] - 1, this.rotationAxis[1]];
      } else if (dir === "right" && type === "falling") {
        this.rotationAxis = [this.rotationAxis[0] + 1, this.rotationAxis[1]];
      }
    }
  }, {
    key: 'clearFallingFromCanvas',
    value: function clearFallingFromCanvas() {
      var self = this;
      this.fallingPiece.forEach(function (pos) {
        self.ctx.clearRect(pos[0] * 30, pos[1] * 30, 31, 31);
        self.ctx.fillStyle = "rgba(0, 0, 21, 1)";
        self.ctx.fillRect(pos[0] * 30, pos[1] * 30, 31, 31);
      });
    }
  }, {
    key: 'clearShadowFromCanvas',
    value: function clearShadowFromCanvas() {
      var _this = this;

      if (this.shadow) {
        this.shadow.forEach(function (pos) {
          (0, _block2.default)(_this.ctx, pos[0], pos[1], "rgba(0, 0, 21, 1)");
        });
      }
    }
  }, {
    key: 'dropFallingPiece',
    value: function dropFallingPiece() {
      while (!this.pieceFallen("falling")) {
        this.moveFallingPiece("down");
      }
    }
  }, {
    key: 'rotateFallingPiece',
    value: function rotateFallingPiece(direction) {
      var _matrixCoordinates$ap = this.matrixCoordinates.apply(this),
          minX = _matrixCoordinates$ap.minX,
          maxX = _matrixCoordinates$ap.maxX,
          minY = _matrixCoordinates$ap.minY,
          maxY = _matrixCoordinates$ap.maxY;

      var matrix = this.getMatrixFromFalling(minX, maxX, minY, maxY);
      if (matrix.length === 0 || this.matrixContainsFallenPiece(matrix)) {
        return;
      }
      this.clearFallingFromCanvas();
      this.clearShadowFromCanvas();
      this.updateFallingInGrid(Board.EMPTY_SQUARE);
      this.setFallingFromMatrix.call(this, matrix, minX, minY);
      this.updateFallingInGrid("falling");
      this.setShadowPositions();
    }
  }, {
    key: 'matrixContainsFallenPiece',
    value: function matrixContainsFallenPiece(matrix) {
      return matrix.some(function (row) {
        if (row.some(function (el) {
          return el !== 1 && el !== "falling";
        })) {
          return true;
        }
      });
    }
  }, {
    key: 'setFallingFromMatrix',
    value: function setFallingFromMatrix(matrix, minX, minY) {
      var _this2 = this;

      this.fallingPiece = [];
      matrix.forEach(function (row, rowIdx) {
        row.forEach(function (pos, colIdx) {
          if (pos === "falling") {
            _this2.fallingPiece.push([minX + colIdx, minY + rowIdx]);
          }
        });
      });
    }
  }, {
    key: 'matrixCoordinates',
    value: function matrixCoordinates() {
      var minX = void 0,
          maxX = void 0,
          minY = void 0,
          maxY = void 0;

      this.fallingPiece.forEach(function (pos) {
        if (minX === undefined || pos[0] < minX) {
          minX = pos[0];
        }
        if (maxX === undefined || pos[0] > maxX) {
          maxX = pos[0];
        }
        if (minY === undefined || pos[1] < minY) {
          minY = pos[1];
        }
        if (maxY === undefined || pos[1] > maxY) {
          maxY = pos[1];
        }
      });

      var matrixRange = maxX - minX > maxY - minY ? maxX - minX : maxY - minY;
      minX = Math.round(this.rotationAxis[0] - matrixRange / 2);
      maxX = Math.round(this.rotationAxis[0] + matrixRange / 2);
      minY = Math.round(this.rotationAxis[1] - matrixRange / 2);
      maxY = Math.round(this.rotationAxis[1] + matrixRange / 2);

      if (minY < 0 || minX < 0 || maxY > 20 || maxX > 11) {
        return [];
      }

      return { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
    }
  }, {
    key: 'getMatrixFromFalling',
    value: function getMatrixFromFalling(minX, maxX, minY, maxY) {
      var matrix = this.grid.slice(minY, maxY + 1).map(function (row) {
        return row.slice(minX, maxX + 1);
      });

      matrix.forEach(function (row) {
        row.forEach(function (coord) {
          if (coord != 1 && coord != "falling") {
            return [];
          }
        });
      });

      var transposed = [];

      for (var i = 0; i < matrix.length; i++) {
        transposed.push([]);
      }

      for (var _i = 0; _i < matrix.length; _i++) {
        for (var j = 0; j < matrix[_i].length; j++) {
          transposed[j].push(matrix[_i][j]);
        }
      }

      transposed = transposed.map(function (column) {
        return column.reverse();
      });
      return transposed;
    }
  }, {
    key: 'blankGrid',
    value: function blankGrid() {
      var grid = [];
      var row = [];
      for (var i = 0; i < 12; i++) {
        row.push(Board.EMPTY_SQUARE);
      }
      for (var _i2 = 0; _i2 < 20; _i2++) {
        grid.push(row.slice());
      }
      return grid;
    }
  }, {
    key: 'eliminateFullLines',
    value: function eliminateFullLines() {
      var _this3 = this;

      var lineCount = 0;
      this.grid.forEach(function (row, idx) {
        if (row.every(function (coord) {
          return coord !== 1;
        })) {
          lineCount += 1;
          _this3.eliminateLine(idx);
        }
      });
      this.paintCanvas();
      return lineCount;
    }
  }, {
    key: 'paintCanvas',
    value: function paintCanvas() {
      var _this4 = this;

      this.ctx.clearRect(0, 0, 360, 600);
      this.ctx.fillStyle = "rgba(0, 0, 21, 0.95)";
      this.ctx.fillRect(0, 0, 360, 600);
      this.grid.forEach(function (row, rowIdx) {
        row.forEach(function (coord, colIdx) {
          if (coord !== 1) {
            (0, _block2.default)(_this4.ctx, colIdx, rowIdx, coord, false);
          }
        });
      });
    }
  }, {
    key: 'eliminateLine',
    value: function eliminateLine(idx) {
      for (idx; idx > 0; idx--) {
        this.grid[idx] = this.grid[idx - 1].slice();
      }
    }
  }, {
    key: 'pieceFallen',
    value: function pieceFallen(type) {
      var pieceObject = void 0;
      if (type === "falling") {
        pieceObject = this.fallingPiece;
      } else {
        pieceObject = this.shadow;
      }
      var self = this;
      return pieceObject.some(function (pos) {
        if (!self.grid[pos[1] + 1]) {
          return true;
        }
        var nextPos = self.grid[pos[1] + 1][pos[0]];
        if (nextPos !== 1 && nextPos !== "falling") {
          return true;
        }
      });
    }
  }, {
    key: 'onBorder',
    value: function onBorder(direction) {
      var self = this;
      return this.fallingPiece.some(function (pos) {
        if (direction === "right" && pos[0] === 11 || direction === "left" && pos[0] === 0) {
          return true;
        }
        var nextPos = direction === "right" ? self.grid[pos[1]][pos[0] + 1] : self.grid[pos[1]][pos[0] - 1];
        if (nextPos !== 1 && nextPos !== "falling") {
          return true;
        }
      });
    }
  }, {
    key: 'updateFallingInGrid',
    value: function updateFallingInGrid(fallingState) {
      var _this5 = this;

      this.fallingPiece.forEach(function (pos) {
        _this5.grid[pos[1]][pos[0]] = fallingState;
      });
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      var _this6 = this;

      return this.fallingPiece.some(function (coord) {
        if (_this6.grid[coord[1]][coord[0]] !== 1) {
          return true;
        }
      });
    }
  }, {
    key: 'setFallingPiece',
    value: function setFallingPiece(pieceName) {
      this.currentPiece = pieceName;
      this.fallingPieceColor = PIECE_COLORS[pieceName];
      if (pieceName === "square") {
        this.rotationAxis = [4.5, 0.5];
        this.fallingPiece = [[4, 0], [4, 1], [5, 0], [5, 1]];
      } else if (pieceName === "line") {
        this.rotationAxis = [5.5, 1.5];
        this.fallingPiece = [[5, 0], [5, 1], [5, 2], [5, 3]];
      } else if (pieceName === "t") {
        this.rotationAxis = [5, 1];
        this.fallingPiece = [[4, 1], [5, 1], [6, 1], [5, 0]];
      } else if (pieceName === "s") {
        this.rotationAxis = [5, 1];
        this.fallingPiece = [[4, 1], [5, 1], [5, 0], [6, 0]];
      } else if (pieceName === "z") {
        this.rotationAxis = [5, 0];
        this.fallingPiece = [[4, 0], [5, 0], [5, 1], [6, 1]];
      } else if (pieceName == "j") {
        this.rotationAxis = [5, 1];
        this.fallingPiece = [[5, 0], [5, 1], [5, 2], [4, 2]];
      } else if (pieceName == "l") {
        this.rotationAxis = [5, 1];
        this.fallingPiece = [[5, 0], [5, 1], [5, 2], [6, 2]];
      }
      this.clearShadowFromCanvas();
      this.setShadowPositions();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      if (this.shadow) {
        this.shadow.forEach(function (pos, idx) {
          (0, _block2.default)(_this7.ctx, pos[0], pos[1], "gray");
        });
      }

      this.fallingPiece.forEach(function (pos) {
        (0, _block2.default)(_this7.ctx, pos[0], pos[1], _this7.fallingPieceColor);
      });
    }
  }]);

  return Board;
}();

var PIECE_COLORS = {
  "square": "rgb(244, 228, 4)",
  "line": "rgb(4, 244, 228)",
  "t": "rgb(228, 4, 244)",
  "s": "rgb(20, 244, 4)",
  "z": "rgb(244, 4, 20)",
  "j": "rgb(244, 108, 4)",
  "l": "rgb(4, 20, 244)"
};

Board.EMPTY_SQUARE = 1;

exports.default = Board;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

var _next_piece = __webpack_require__(8);

var _next_piece2 = _interopRequireDefault(_next_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.boardCanvas = ctx;
    this.welcomeText.call(this);
    $(document).keydown(this.handleKeydown.bind(this));
    this.playNextPiece = this.playNextPiece.bind(this);
    this.playGame = this.playGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.incrementScore.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.gameOverText = this.gameOverText.bind(this);
  }

  _createClass(Game, [{
    key: 'welcomeText',
    value: function welcomeText() {
      this.boardCanvas.font = "24px Times New Roman";
      this.boardCanvas.fillStyle = "white";
      this.boardCanvas.fillText("Welcome To Tetris", 88, 250);
      this.boardCanvas.fillText("Press 'b' to begin the game", 52, 280);
    }
  }, {
    key: 'gameOverText',
    value: function gameOverText() {
      this.boardCanvas.fillStyle = "rgba(0, 0, 21, 1)";
      this.boardCanvas.fillRect(0, 170, 360, 150);
      this.boardCanvas.font = "46px Times New Roman";
      this.boardCanvas.fillStyle = "red";
      this.boardCanvas.fillText("GAME OVER", 42, 250);
      this.boardCanvas.font = "24px Times New Roman";
      this.boardCanvas.fillStyle = "white";
      this.boardCanvas.fillText("Press 'b' to begin again", 68, 280);
    }
  }, {
    key: 'createModal',
    value: function createModal() {
      var _this = this;

      var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function onOpen() {
          console.log('modal open');
        },
        onClose: function onClose() {
          console.log('modal close');
          if (_this.paused) {
            _this.playGame();
          }
        }
      });
      modal.setContent('<div><h1>GAME PAUSED</h1><p>Press "p" or close box to continue</p></div>');

      return modal;
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      if (e.keyCode === 37 && !this.board.onBorder('left')) {
        this.board.moveFallingPiece("left");
      } else if (e.keyCode === 39 && !this.board.onBorder('right')) {
        this.board.moveFallingPiece("right");
      } else if (e.keyCode == 40 && !this.board.pieceFallen("falling")) {
        this.board.moveFallingPiece('down');
      } else if (e.keyCode === 38) {
        this.board.rotateFallingPiece('left');
      } else if (e.keyCode == 32) {
        this.board.dropFallingPiece();
        clearInterval(this.interval);
        setTimeout(this.resetTimer.bind(this), this.levelSpeed / 2);
      } else if (e.keyCode === 80) {
        if (this.paused) {
          this.UIModal.close();
          this.playGame();
        } else {
          this.pauseGame();
        }
      } else if (e.keyCode === 83) {
        this.toggleSavedPiece();
      } else if (e.keyCode === 66 && this.gameOver !== false) {
        this.beginGame();
      }
      if (this.board) {
        this.board.render();
      }
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer() {
      clearInterval(this.interval);
      this.interval = setInterval(this.updateBoard.bind(this), this.levelSpeed);
      this.updateBoard.apply(this);
    }
  }, {
    key: 'beginGame',
    value: function beginGame() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.gameOver = false;
      this.boardCanvas.fillStyle = "rgba(0, 0, 21, 1)";
      this.boardCanvas.fillRect(0, 0, 360, 600);
      this.currentPiece = this.randomPiece.apply(this);
      this.board = new _board2.default(this.currentPiece, this.boardCanvas);
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
  }, {
    key: 'playGame',
    value: function playGame() {
      this.interval = setInterval(this.updateBoard.bind(this), this.levelSpeed);
      this.paused = false;
    }
  }, {
    key: 'pauseGame',
    value: function pauseGame() {
      clearInterval(this.interval);
      this.paused = true;
      this.UIModal.open();
    }
  }, {
    key: 'updateBoard',
    value: function updateBoard() {
      if (this.board.pieceFallen("falling")) {
        this.playNextPiece();
      } else {
        this.board.moveFallingPiece("down");
      }
      this.board.render();
    }
  }, {
    key: 'incrementScore',
    value: function incrementScore(lineCount) {
      this.score += 100 * lineCount * lineCount;
      document.getElementById('score').innerHTML = this.score;
      if (this.score >= LEVEL_THRESHOLDS[this.levelsIndex + 1]) {
        this.nextLevel.apply(this);
      }
    }
  }, {
    key: 'toggleSavedPiece',
    value: function toggleSavedPiece() {
      this.board.clearFallingFromCanvas();
      this.board.updateFallingInGrid(_board2.default.EMPTY_SQUARE);
      if (this.savedPiece) {
        this.board.setFallingPiece(this.savedPiece);
        this.savedPiece = this.currentPiece;
      } else {
        this.savedPiece = this.currentPiece;
        this.board.setFallingPiece(this.nextPiece);
        this.nextPiece = this.randomPiece();
        this.paintNextPiece();
        this.board.updateFallingInGrid('falling');
      }
      this.paintSavedPiece();
    }
  }, {
    key: 'nextLevel',
    value: function nextLevel() {
      this.levelsIndex += 1;
      this.levelSpeed = Math.floor(500 / (this.levelsIndex + 0.1));
      clearInterval(this.interval);
      this.interval = setInterval(this.updateBoard.bind(this), this.levelSpeed);
    }
  }, {
    key: 'playNextPiece',
    value: function playNextPiece() {
      this.board.updateFallingInGrid(this.board.fallingPieceColor);
      this.board.shadow = null;
      var eliminatedLineCount = this.board.eliminateFullLines();
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
  }, {
    key: 'paintNextPiece',
    value: function paintNextPiece() {
      this.nextPieceCanvas.fillStyle = "rgba(0, 0, 21, 0.95)";
      this.nextPieceCanvas.fillRect(0, 0, 200, 200);
      (0, _next_piece2.default)(this.nextPiece, this.nextPieceCanvas);
    }
  }, {
    key: 'paintSavedPiece',
    value: function paintSavedPiece() {
      this.savedPieceCanvas.fillStyle = "rgba(0, 0, 21, 0.95)";
      this.savedPieceCanvas.fillRect(0, 0, 200, 200);
      (0, _next_piece2.default)(this.savedPiece, this.savedPieceCanvas);
    }
  }, {
    key: 'randomPiece',
    value: function randomPiece() {
      var index = Math.floor(Math.random() * 7);
      if (PIECES[index] || !this.board || PIECES[index] !== this.board.currentPiece) {
        return PIECES[index];
      } else {
        index = Math.floor(Math.random() * 6);
        return PIECES[index];
      }
    }
  }]);

  return Game;
}();

var LEVEL_THRESHOLDS = {
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

var PIECES = ["square", "j", "l", "line", "s", "z", "t"];

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var clearBlock = function clearBlock(ctx, x, y, color, cover, size) {
  x = x * 40 - 1;
  y = y * 40 - 1;
  size = 40;
  ctx.fillStyle = "rgba(0, 0, 21, 0.95)";
  ctx.fillRect(x, y, size + 2, size + 2);
};

exports.default = clearBlock;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(0);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var outverseSkew = function outverseSkew(ctx, x, y, size) {
  y += 1;
  for (var i = 0; i < 2; i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(20, 244, 4)', size);
    x += 1;
  }

  x -= 1;
  y -= 1;
  for (var _i = 0; _i < 2; _i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(20, 244, 4)', size);
    x += 1;
  }
};

exports.default = outverseSkew;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(0);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jBlock = function jBlock(ctx, x, y, size) {
  for (var i = 0; i < 3; i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(4, 20, 244)', size);
    x += 1;
  }

  x -= 3;
  y += 1;
  (0, _block2.default)(ctx, x, y, 'rgb(4, 20, 244)', size);
};

exports.default = jBlock;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(0);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lBlock = function lBlock(ctx, x, y, size) {
  for (var i = 0; i < 3; i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(244, 108, 4)', size);
    x += 1;
  }

  x -= 1;
  y += 1;
  (0, _block2.default)(ctx, x, y, 'rgb(244, 108, 4)', size);
};

exports.default = lBlock;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(0);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var line = function line(ctx, x, y, size) {
  for (var i = 0; i < 4; i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(4, 244, 228)', size);
    x += 1;
  }
};

exports.default = line;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inverse_skew = __webpack_require__(4);

var _inverse_skew2 = _interopRequireDefault(_inverse_skew);

var _j_block = __webpack_require__(5);

var _j_block2 = _interopRequireDefault(_j_block);

var _l_block = __webpack_require__(6);

var _l_block2 = _interopRequireDefault(_l_block);

var _line = __webpack_require__(7);

var _line2 = _interopRequireDefault(_line);

var _outverse_skew = __webpack_require__(9);

var _outverse_skew2 = _interopRequireDefault(_outverse_skew);

var _square = __webpack_require__(10);

var _square2 = _interopRequireDefault(_square);

var _t_turn = __webpack_require__(11);

var _t_turn2 = _interopRequireDefault(_t_turn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextPiece = function nextPiece(nextPieceType, nextPieceCtx) {
  nextPieceCtx.fillStyle = 'rgba(0, 0, 21, 0.95)';
  nextPieceCtx.fillRect(0, 0, 360, 600);
  if (nextPieceType === "square") {
    (0, _square2.default)(nextPieceCtx, 1, 0.5, 30);
  } else if (nextPieceType === "l") {
    (0, _j_block2.default)(nextPieceCtx, 1, 0.5, 30);
  } else if (nextPieceType === "j") {
    (0, _l_block2.default)(nextPieceCtx, 1, 0.5, 30);
  } else if (nextPieceType === "line") {
    (0, _line2.default)(nextPieceCtx, 0.5, 1, 30);
  } else if (nextPieceType === "z") {
    (0, _outverse_skew2.default)(nextPieceCtx, 1, 0.5, 30);
  } else if (nextPieceType === "t") {
    (0, _t_turn2.default)(nextPieceCtx, 1, 0.5, 30);
  } else if (nextPieceType === "s") {
    (0, _inverse_skew2.default)(nextPieceCtx, 1, 0.5, 30);
  }
};

exports.default = nextPiece;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(0);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inverseSkew = function inverseSkew(ctx, x, y, size) {
  for (var i = 0; i < 2; i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(244, 4, 20)', size);
    x += 1;
  }

  x -= 1;
  y += 1;
  for (var _i = 0; _i < 2; _i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(244, 4, 20)', size);
    x += 1;
  }
};

exports.default = inverseSkew;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(0);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var square = function square(ctx, x, y, size) {
  for (var i = 0; i < 2; i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(244, 228, 4)', size);
    x += 1;
  }
  x -= 1 * 2;
  y += 1;

  for (var _i = 0; _i < 2; _i++) {
    (0, _block2.default)(ctx, x, y, 'rgb(244, 228, 4)', size);
    x += 1;
  }
};

exports.default = square;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(0);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tTurn = function tTurn(ctx, x, y, size) {
  for (var i = 0; i < 3; i++) {
    (0, _block2.default)(ctx, x, y, "rgb(228, 4, 244)", size);
    x += 1;
  }

  x -= 2;
  y += 1;
  (0, _block2.default)(ctx, x, y, "rgb(228, 4, 244)", size);
};

exports.default = tTurn;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  var canvas = document.getElementById('board');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgba(0, 0, 21, 0.95)";
  ctx.fillRect(0, 0, 360, 600);
  var game = new _game2.default(ctx);
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map