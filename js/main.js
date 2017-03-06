import Game from './game';
import Board from './board';

$( () => {
  let canvas = document.getElementById('board');
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 360, 600);
  let game = new Game(ctx);
});
