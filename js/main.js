import line from './blocks/line';
import square from './blocks/square';
import lBlock from './blocks/l_block';
import jBlock from './blocks/j_block';
import tTurn from './blocks/t_turn';
import inverseSkew from './blocks/inverse_skew';
import outverseSkew from './blocks/outverse_skew';

$( () => {
  let canvas = document.getElementById('board');
  let ctx = canvas.getContext('2d');
  ctx.strokeRect(0,0, 480, 800);
  outverseSkew(ctx, 0, 0, 40);
});
