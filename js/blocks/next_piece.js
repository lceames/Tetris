import s from './inverse_skew';
import j from './j_block';
import l from './l_block';
import line from './line';
import z from './outverse_skew';
import square from './square';
import t from './t_turn';

const nextPiece = (nextPieceType, nextPieceCtx) => {
  if (nextPieceType === "square") {
    square(nextPieceCtx, 3, 3, 30);
  }
  else if (nextPieceType === "j") {
    j(nextPieceCtx, 2, 2, 30);
  }
  else if (nextPieceType === "l") {
    l(nextPieceCtx, 2, 2, 30);
  }
  else if (nextPieceType === "line") {
    line(nextPieceCtx, 2, 2, 30);
  }
  else if (nextPieceType === "z") {
    z(nextPieceCtx, 2, 2, 30);
  }
  else if (nextPieceType === "t") {
    t(nextPieceCtx, 2, 2, 30);
  }
  else if (nextPieceType === "s"){
    s(nextPieceCtx, 2, 2, 30);
  }
  else {
    debugger
  }

};

export default nextPiece;
