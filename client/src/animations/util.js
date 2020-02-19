export function getCanvasDims() {
  const canvasDiv = document.getElementsByClassName('p5Canvas')[0]
    .parentElement;
  canvasDiv.style.display = 'flex';

  const width = canvasDiv.parentElement.clientWidth;
  const height = canvasDiv.parentElement.clientHeight;

  return [width, height];
}

export function getInternalCanvasDims(width, height, s) {
  const remWidth = (width % s) + 1.5 * s;
  const remHeight = (height % s) + 1.5 * s;
  const inWidth = width - remWidth;
  const inHeight = height - remHeight;

  const tWidth = Math.round(remWidth / 2);
  const tHeight = Math.round(remHeight / 2);

  return [inWidth, inHeight, tWidth, tHeight];
}
