const block = (ctx, x, y, color, size) => {
  debugger
  x = (x * 40) + 1;
  y = (y * 40) + 1;
  size = 39;
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.fillRect(x, y, size, size);
  ctx.strokeRect(x, y, size, size);
};

export default block;
