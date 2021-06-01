import * as util from './util';

function GameOfLife(p5) {
  console.log('Starting up GameOfLife p5js...');

  const s = 20;
  const fillColor = 180;

  function Cell(index, x, y, neighbors, val) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.neighbors = neighbors;
    this.val = val;

    this.addNeighbor = (nIndex) => {
      this.neighbors.push(nIndex);
    };

    this.flipState = () => {
      this.val = 1 - this.val;
      this.draw();
    };

    this.draw = () => {
      const fill = this.val ? fillColor : 0;
      p5.fill(fill);
      p5.stroke(0);
      p5.rect(this.x * s, this.y * s, s, s);
    };
  }

  let grid;
  let inWidth;
  let inHeight;
  let tWidth;
  let tHeight;
  let row;
  let col;

  function initGameOfLife(inWidth, inHeight, blank) {
    // Drawing border
    p5.stroke(255);
    p5.fill(0);
    p5.rect(0, 0, inWidth, inHeight);

    grid = [];
    row = inWidth / s;
    col = inHeight / s;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const index = j + i * col;
        const val = blank ? 0 : p5.round(p5.random(0.75));

        const newCell = new Cell(index, i, j, [], val);

        // Finding indexs of neighbors, adjacent and wrapping around
        const numRows = row - 1;
        const numCols = col - 1;

        const neighbors = grid.filter((cell) => {
          const xDiff = Math.abs(cell.x - i);
          const yDiff = Math.abs(cell.y - j);

          const cond1 = xDiff <= 1 || xDiff === numRows;
          const cond2 = yDiff <= 1 || yDiff === numCols;
          return cond1 && cond2;
        });

        // Adding indexes to each other
        neighbors.forEach((cell) => {
          newCell.addNeighbor(cell.index);
          cell.addNeighbor(newCell.index);
        });

        grid.push(newCell);
        newCell.draw();
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
    p5.translate(tWidth, tHeight);
    p5.frameRate(12);
    p5.background(0);

    initGameOfLife(inWidth, inHeight, false);
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
    const alive = grid.filter((cell) => cell.val === 1);
    alive.forEach((cell) => {
      if (!toCheck.includes(cell.index)) {
        toCheck.push(cell.index);
      }

      cell.neighbors.forEach((nIndex) => {
        if (!toCheck.includes(nIndex)) {
          toCheck.push(nIndex);
        }
      });
    });

    // Checking cells to see if they will switch live states
    toCheck.forEach((index) => {
      let count = 0;
      const cell = grid[index];
      cell.neighbors.forEach((n) => (count += grid[n].val));

      if (cell.val === 1) {
        if (count < 2 || count > 3) {
          toChange.push(index);
        }
      } else if (cell.val === 0) {
        if (count === 3) {
          toChange.push(index);
        }
      }
    });

    // Looping and drawing grid
    grid.forEach((cell) => {
      if (toChange.includes(cell.index)) {
        cell.flipState();
      }

      cell.draw();
    });
  };

  let lastDrawn = [];
  const mouseDraw = (isDragging) => {
    // Only allowing drawing while paused
    if (!p5.isLooping()) {
      const x = p5.mouseX;
      const y = p5.mouseY;

      // Check if clicked inside canvas
      if (util.hasClickedInCanvas(x, y, inWidth, inHeight, tWidth, tHeight)) {
        const xCell = Math.floor((x - tWidth) / s);
        const yCell = Math.floor((y - tHeight) / s);

        const clickedCell = grid.filter((cell) => {
          return cell.x === xCell && cell.y === yCell;
        });

        if (isDragging) {
          if ([xCell, yCell] !== lastDrawn && clickedCell[0].val === 0) {
            clickedCell[0].flipState();
            lastDrawn = [xCell, yCell];
          }
        } else {
          clickedCell[0].flipState();
        }
      }
    }
  };

  p5.mousePressed = () => {
    mouseDraw(false);
  };

  p5.mouseDragged = () => {
    mouseDraw(true);
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.loop) {
      p5.loop();
    } else {
      p5.noLoop();
    }

    if (props.reset) {
      const blank = grid.reduce((acc, cell) => {
        return acc + cell.val;
      }, 0) === 0;

      initGameOfLife(inWidth, inHeight, !blank);
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
    initGameOfLife(inWidth, inHeight, false);
  };
}

export default GameOfLife;
