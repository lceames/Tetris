import block from './block';

const outverseSkew = (ctx, x, y, size) => {
  y += size;
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'red', size);
    x += size;
  }

  x -= size;
  y -= size;
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'red', size);
    x += size;
  }
};

export default outverseSkew;
