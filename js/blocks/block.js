const block = (ctx, x, y, color, size) => {
  x = (x + 1) * 40;
  y = (y + 1) * 40;
  size = 40;
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.fillRect(x, y, size, size);
  ctx.strokeRect(x, y, size, size);
};

export default block;
