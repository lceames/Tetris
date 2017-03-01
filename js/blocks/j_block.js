import block from './block';

const jBlock = (ctx, x, y, size) => {
  for (let i = 0; i < 3; i++) {
    block(ctx, x, y, 'orange', size);
    x += size;
  }

  x -= (size * 3);
  y += size;
  block(ctx, x, y, 'orange', size);
};

export default jBlock;
