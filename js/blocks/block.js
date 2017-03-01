const block = (ctx, x, y, color, size) => {
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.fillRect(x, y, size, size);
  ctx.strokeRect(x, y, size, size);
};

export default block;
