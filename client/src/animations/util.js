export function getCanvasDims() {
  const canvasDiv = document.getElementsByClassName('p5Canvas')[0]
    .parentElement;
  canvasDiv.style.display = 'flex';

  // Calculating proper canvas height using children of root
  const root = document.getElementById('root');
  const children = root.childNodes[0].childNodes;
  const totalHeight = root.clientHeight;
  const navHeight = Array.from(children)
    .slice(0, -1)
    .reduce((acc, val) => {
      return acc + val.scrollHeight;
    }, 0);

  const width = root.clientWidth;
  const height = totalHeight - navHeight;

  return [width, height];
}

export function getInternalCanvasDims(width, height, s) {
  const navHeight = roundDownToS(30, s);
  const remWidth = (width % s) + 2 * s;
  const remHeight = (height % s) + 2 * s + navHeight;

  const tWidth = Math.round(remWidth / 2);
  const tHeight = Math.round(remHeight / 2) + Math.round(s / 2);

  const inWidth = width - remWidth;
  const inHeight = height - remHeight;

  return [inWidth, inHeight, tWidth, tHeight];
}

export function roundDownToS(val, s) {
  const int = Math.floor(val);
  return int - (int % s);
}

export function oppositeSign(a, b) {
  return a < 0 ? b > 0 : b < 0;
}
