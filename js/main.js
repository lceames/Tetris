import Game from './game';
import Board from './board';

$( () => {
  let board = new Board("square");
  let game = new Game(board);
});
