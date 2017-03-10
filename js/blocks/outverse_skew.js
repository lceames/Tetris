import block from './block';

const outverseSkew = (ctx, x, y, size) => {
  y += 1;
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'rgb(244, 4, 20)', size);
    x += 1;
  }

  x -= 1;
  y -= 1;
  for (let i = 0; i < 2; i++) {
    block(ctx, x, y, 'rgb(244, 4, 20)', size);
    x += 1;
  }
};

export default outverseSkew;
