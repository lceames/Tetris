import block from './block';

const square = (ctx, x, y, size) => {
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'yellow', size);
    x += size;
  }
  x -= (size * 2);
  y += size;

  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'yellow', size);
    x += size;
  }
};

export default square;
