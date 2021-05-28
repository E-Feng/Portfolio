import * as util from './util';

function GameOfLife(p5) {
  console.log('Starting up GameOfLife p5js...');

  let grid;
  let inWidth;
  let inHeight;
  let tWidth;
  let tHeight;
  let row;
  let col;

  const s = 20;

  const fillColor = 180;

  function initGameOfLife(inWidth, inHeight) {
  grid = [];
  row = inWidth / s;
  col = inHeight / s;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const index = j + i * col;
      const cell = {
        index: index,
        x: i,
        y: j,
        neighbors: [],
        val: p5.round(p5.random(0.75)),
      };

      // Finding indexs of neighbors
      const neighbors = grid.filter(o => {
        const cond1 = Math.abs(o.x - cell.x) <= 1;
        const cond2 = Math.abs(o.y - cell.y) <= 1;
        return (cond1 && cond2)
      })
      
      neighbors.forEach(o => {
        o.neighbors.push(index);
        cell.neighbors.push(o.index)
      })

      grid.push(cell);
    }
  }
  }

  p5.setup = () => {
    const [width, height] = util.getCanvasDims();
    [inWidth, inHeight, tWidth, tHeight] = util.getInternalCanvasDims(
      width,
      height,
      s
    );

    p5.createCanvas(width, height);
    p5.background(0);
    p5.frameRate(12);

    initGameOfLife(inWidth, inHeight)
  };

  p5.draw = () => {
    // Initial setup for the frame and background
    p5.translate(tWidth, tHeight);
    p5.stroke(255);
    p5.noFill();
    p5.rect(0, 0, inWidth, inHeight);

    // Playing the game
    const toCheck = [];
    const toChange = [];

    // Checking only alive cells and their neighbors
    const alive = grid.filter(cell => cell.val === 1);
    alive.forEach(cell => {
      if (!toCheck.includes(cell.index)) {
        toCheck.push(cell.index);
      }

      cell.neighbors.forEach(nIndex => {
        if (!toCheck.includes(nIndex)) {
          toCheck.push(nIndex);
        }
      })
    })

    // Checking cells to see if they will switch live states
    toCheck.forEach(index => {
      let count = 0;
      const cell = grid[index]
      cell.neighbors.forEach(n => count += grid[n].val);

      if (cell.val === 1) {
        if (count < 2 || count > 3) {
          toChange.push(index)
        }
      } else if (cell.val === 0) {
        if (count === 3) {
          toChange.push(index)
        }
      }
    })

    // Looping and drawing grid
    grid.forEach(cell => {
      if (toChange.includes(cell.index)) {
        grid[cell.index].val = 1 - grid[cell.index].val;
      }

      const fill = grid[cell.index].val ? fillColor : 0;
      p5.fill(fill);
      p5.stroke(0);
      p5.rect(cell.x*s, cell.y*s, s, s);
    })
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {
    if (props.loop) {
      p5.loop();
    } else {
      p5.noLoop();
    }

    if (props.reset) {
      initGameOfLife(inWidth, inHeight);
      props.setReset(false);
    }
  };

  p5.windowResized = () => {
    const [width, height] = util.getCanvasDims();
    [inWidth, inHeight, tWidth, tHeight] = util.getInternalCanvasDims(
      width,
      height,
      s
    );
    p5.resizeCanvas(width, height);
    initGameOfLife(inWidth, inHeight);
  };
}

export default GameOfLife;
