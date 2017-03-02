const block = (ctx, x, y, color, size) => {
  x = x * 40;
  y = y * 40;
  size = 40;
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.fillRect(x, y, size, size);
  ctx.strokeRect(x, y, size, size);
};

export default block;
