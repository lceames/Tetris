const clearBlock = (ctx, x, y, color, cover, size) => {
  x = (x * 40) - 1;
  y = (y * 40) - 1;
  size = 40;
  ctx.fillStyle = "rgba(0, 0, 21, 0.95)";
  ctx.fillRect(x, y, size + 2, size + 2);
};

export default clearBlock;
