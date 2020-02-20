export function getCanvasDims() {
  const canvasDiv = document.getElementsByClassName('p5Canvas')[0]
    .parentElement;
  canvasDiv.style.display = 'flex';

  // Calculating proper canvas height using children of root
  const root = document.getElementById('root');
  const children = root.childNodes[0].childNodes;
  const totalHeight = root.clientHeight;
  const navHeight = children[0].scrollHeight + children[1].scrollHeight;

  const width = root.clientWidth;
  const height = totalHeight - navHeight;

  console.log('client', root.clientHeight);
  console.log('offset', root.offsetHeight);
  console.log('scroll', root.scrollHeight);
  console.log('inner', window.innerHeight);

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
