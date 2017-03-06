import s from './inverse_skew';
import j from './j_block';
import l from './l_block';
import line from './line';
import z from './outverse_skew';
import square from './square';
import t from './t_turn';

const nextPiece = (nextPieceType, nextPieceCtx) => {
  nextPieceCtx.fillStyle = 'rgba(0, 0, 21, 0.95)';
  nextPieceCtx.fillRect(0,0, 360, 600);
  if (nextPieceType === "square") {
    square(nextPieceCtx, 1, 0.5, 30);
  }
  else if (nextPieceType === "l") {
    j(nextPieceCtx, 1, 0.5, 30);
  }
  else if (nextPieceType === "j") {
    l(nextPieceCtx, 1, 0.5, 30);
  }
  else if (nextPieceType === "line") {
    line(nextPieceCtx, 0.5, 1, 30);
  }
  else if (nextPieceType === "z") {
    z(nextPieceCtx, 1, 0.5, 30);
  }
  else if (nextPieceType === "t") {
    t(nextPieceCtx, 1, 0.5, 30);
  }
  else if (nextPieceType === "s"){
    s(nextPieceCtx, 1, 1, 30);
  }
};

export default nextPiece;
