import block from './block';

const lBlock = (ctx, x, y, size) => {
  for (let i = 0; i < 3; i++) {
    block(ctx, x, y, 'rgb(244, 108, 4)', size);
    x += 1;
  }

  x -= 1;
  y += 1;
  block(ctx, x, y, 'rgb(244, 108, 4)', size);
};

export default lBlock;
