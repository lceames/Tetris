import block from './block';

const jBlock = (ctx, x, y, size) => {
  for (let i = 0; i < 3; i++) {
    block(ctx, x, y, 'rgb(4, 20, 244)', size);
    x += 1;
  }

  x -= 3;
  y += 1;
  block(ctx, x, y, 'rgb(4, 20, 244)', size);
};

export default jBlock;
