const block = (ctx, x, y, color, size) => {
  x = (x * 30) + 1;
  y = (y * 30) + 1;
  size = 29;
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.fillRect(x, y, size, size);
  ctx.strokeRect(x, y, size, size);
};

export default block;
