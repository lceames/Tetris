import block from './block';

const lBlock = (ctx, x, y, size) => {
  for (let i = 0; i < 3; i++) {
    block(ctx, x, y, 'blue', size);
    x += 1;
  }

  x -= 1;
  y += 1;
  block(ctx, x, y, 'blue', size);
};

export default lBlock;
