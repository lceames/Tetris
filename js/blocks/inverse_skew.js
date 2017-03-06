import block from './block';

const inverseSkew = (ctx, x, y, size) => {
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'green', size);
    x += 1;
  }

  x -= 1;
  y += 1;
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'green', size);
    x += 1;
  }
};

export default inverseSkew;
