import block from './block';

const tTurn = (ctx, x, y, size) => {
  for (let i = 0; i < 3; i++) {
    block(ctx, x, y, 'rgb(4, 244, 228)', size);
    x += 1;
  }

  x -= 2;
  y += 1;
  block(ctx, x, y, 'rgb(4, 244, 228)', size);
};

export default tTurn;
