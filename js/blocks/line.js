import block from './block';

const line = (ctx, x, y, size) => {
  for (let i = 0; i < 4; i++) {
    block(ctx, x, y, 'rgb(4, 244, 228)', size);
    x += 1;
  }
};

export default line;
