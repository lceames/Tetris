import block from './block';

const lBlock = (ctx, x, y, size) => {
  for (let i = 0; i < 3; i++) {
    block(ctx, x, y, 'blue', size);
    x += size;
  }

  x -= size;
  y += size;
  block(ctx, x, y, 'blue', size);
};

export default lBlock;
