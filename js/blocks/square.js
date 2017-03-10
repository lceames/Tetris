import block from './block';

const square = (ctx, x, y, size) => {
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'rgb(244, 228, 4)', size);
    x += 1;
  }
  x -= (1 * 2);
  y += 1;

  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'rgb(244, 228, 4)', size);
    x += 1;
  }
};

export default square;
