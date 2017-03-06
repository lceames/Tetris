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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(1);

var _block2 = _interopRequireDefault(_block);

var _clear_block = __webpack_require__(3);

var _clear_block2 = _interopRequireDefault(_clear_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(pieceName, ctx) {
    _classCallCheck(this, Board);

    this.grid = this.blankGrid();
    this.ctx = ctx;
    this.fallingPieceColor = PIECE_COLORS[pieceName];
    this.currentPiece = pieceName;
    this.setFallingPiece(pieceName);
    this.updateFallingInGrid("falling");
    this.pieceFallen = this.pieceFallen.bind(this);
    this.moveFallingPiece = this.moveFallingPiece.bind(this);
    this.eliminateFullLines = this.eliminateFullLines.bind(this);
  }

  _createClass(Board, [{
    key: 'moveFallingPiece',
    value: function moveFallingPiece(dir) {
      this.updateFallingInGrid(Board.EMPTY_SQUARE);
      this.clearFallingFromCanvas();
      this.updateFallingPos(dir);
      this.updateFallingInGrid("falling");
    }
  }, {
    key: 'updateFallingPos',
    value: function updateFallingPos(dir) {
      this.fallingPiece = this.fallingPiece.map(function (pos) {
        if (dir === "down") {
          return [pos[0], pos[1] + 1];
        } else if (dir === "right") {
          return [pos[0] + 1, pos[1]];
        } else if (dir === "left") {
          return [pos[0] - 1, pos[1]];
        }
      });

      if (dir === "down") {
        this.rotationAxis = [this.rotationAxis[0], this.rotationAxis[1] + 1];
      } else if (dir === "left") {
        this.rotationAxis = [this.rotationAxis[0] - 1, this.rotationAxis[1]];
      } else if (dir === "right") {
        this.rotationAxis = [this.rotationAxis[0] + 1, this.rotationAxis[1]];
      }
    }
  }, {
    key: 'clearFallingFromCanvas',
    value: function clearFallingFromCanvas() {
      var self = this;
      this.fallingPiece.forEach(function (pos) {
        self.ctx.fillStyle = "white";
        self.ctx.fillRect(pos[0] * 30, pos[1] * 30, 31, 31);
      });
    }
  }, {
    key: 'dropFallingPiece',
    value: function dropFallingPiece() {
      while (!this.pieceFallen()) {
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
      this.updateFallingInGrid(Board.EMPTY_SQUARE);
      this.setFallingFromMatrix.call(this, matrix, minX, minY);
      this.updateFallingInGrid("falling");
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
      var _this = this;

      this.fallingPiece = [];
      matrix.forEach(function (row, rowIdx) {
        row.forEach(function (pos, colIdx) {
          if (pos === "falling") {
            _this.fallingPiece.push([minX + colIdx, minY + rowIdx]);
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
      var _this2 = this;

      this.grid.forEach(function (row, idx) {
        if (row.every(function (coord) {
          return coord !== 1;
        })) {
          _this2.eliminateLine(idx);
        }
      });
      this.paintCanvas();
    }
  }, {
    key: 'paintCanvas',
    value: function paintCanvas() {
      var _this3 = this;

      this.ctx.clearRect(0, 0, 360, 600);
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, 360, 600);
      this.grid.forEach(function (row, rowIdx) {
        row.forEach(function (coord, colIdx) {
          if (coord !== 1) {
            (0, _block2.default)(_this3.ctx, colIdx, rowIdx, coord, false);
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
    value: function pieceFallen() {
      var self = this;
      return this.fallingPiece.some(function (pos) {
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
      var _this4 = this;

      this.fallingPiece.forEach(function (pos) {
        _this4.grid[pos[1]][pos[0]] = fallingState;
      });
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      var _this5 = this;

      return this.fallingPiece.some(function (coord) {
        if (_this5.grid[coord[1]][coord[0]] !== 1) {
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
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      this.fallingPiece.forEach(function (pos) {
        (0, _block2.default)(_this6.ctx, pos[0], pos[1], _this6.fallingPieceColor, false);
      });
    }
  }]);

  return Board;
}();

var PIECE_COLORS = {
  "square": "yellow",
  "line": "cyan",
  "t": "purple",
  "s": "green",
  "z": "red",
  "j": "blue",
  "l": "orange"
};

Board.EMPTY_SQUARE = 1;

exports.default = Board;

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _block = __webpack_require__(1);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.board = new _board2.default(this.randomPiece.apply(this), ctx);
    this.nextPiece = this.randomPiece.apply(this);
    // this.nextPieceCanvas = document.getElementById('next-piece').getContext('2d');
    // this.paintNextPiece.apply(this);
    this.interval = setInterval(this.updateBoard.bind(this), 500);
    $(document).keydown(this.handleKeydown.bind(this));
    this.playNextPiece = this.playNextPiece.bind(this);
  }

  _createClass(Game, [{
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      if (e.keyCode === 37 && !this.board.onBorder('left')) {
        this.board.moveFallingPiece("left");
      } else if (e.keyCode === 39 && !this.board.onBorder('right')) {
        this.board.moveFallingPiece("right");
      } else if (e.keyCode == 40 && !this.board.pieceFallen()) {
        this.board.moveFallingPiece('down');
      } else if (e.keyCode === 65) {
        this.board.rotateFallingPiece('left');
      } else if (e.keyCode === 83) {
        this.board.rotateFallingPiece('right');
      } else if (e.keyCode == 32) {
        this.board.dropFallingPiece();
        this.playNextPiece();
      }
      this.board.render();
    }
  }, {
    key: 'updateBoard',
    value: function updateBoard() {
      if (this.board.pieceFallen()) {
        this.playNextPiece();
      } else {
        this.board.moveFallingPiece("down");
      }
      this.board.render();
    }
  }, {
    key: 'playNextPiece',
    value: function playNextPiece() {

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
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, size + 2, size + 2);
};

exports.default = clearBlock;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  var canvas = document.getElementById('board');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 360, 600);
  var game = new _game2.default(ctx);
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map