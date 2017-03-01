import block from './block';

const inverseSkew = (ctx, x, y, size) => {
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'green', size);
    x += size;
  }

  x -= size;
  y += size;
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'green', size);
    x += size;
  }
};

export default inverseSkew;
