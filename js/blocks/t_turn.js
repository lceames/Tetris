import block from './block';

const tTurn = (ctx, x, y, size) => {
  for (let i = 0; i < 3; i++) {
    block(ctx, x, y, 'purple', size);
    x += size;
  }

  x -= (size * 2);
  y += size;
  block(ctx, x, y, 'purple', size);
};

export default tTurn;
