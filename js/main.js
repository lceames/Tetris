import Game from './game';
import Board from './board';

$( () => {
  let canvas = document.getElementById('board');
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 480, 800);
  ctx.strokeRect(0,0, 482, 802);
  let board = new Board("square", ctx);
  let game = new Game(board);
});
