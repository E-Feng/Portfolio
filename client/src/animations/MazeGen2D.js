import * as util from './util';

function MazeGen2D(p5) {
  // 2D Cell function/class instance
  function Cell2D(p5, i, j, visited) {
    this.i = i;
    this.j = j;
    this.visited = visited;
    this.color = [255, 255, 255];

    this.x1 = this.i * s;
    this.x2 = this.i * s + s;
    this.y1 = this.j * s;
    this.y2 = this.j * s + s;

    this.draw = (toDraw, bgColor, wallColor) => {
      // Coloring in cells and walls
      if (bgColor) {
        p5.fill(bgColor);
        p5.noStroke();
        p5.rect(this.x1 + th / 2, this.y1 + th / 2, s - th, s - th);
        this.color = bgColor;
      }

      if (wallColor) {
        p5.stroke(wallColor);
        p5.noFill();
        p5.strokeWeight(th);
        for (let i = 0; i < toDraw.length; i++) {
          if (toDraw[i]) {
            // Top-Right-Bottom-Left == 0-1-2-3
            switch (i) {
              case 0:
                p5.line(this.x1, this.y1, this.x2, this.y1);
                break;
              case 1:
                p5.line(this.x2, this.y1, this.x2, this.y2);
                break;
              case 2:
                p5.line(this.x2, this.y2, this.x1, this.y2);
                break;
              case 3:
                p5.line(this.x1, this.y2, this.x1, this.y2);
                break;
              default:
                break;
            }
          }
        }
      }
    };

    this.getNeighbors = (grid, i, j) => {
      let neighbors = [];
      let orientation = [];
      if (isValidCell(grid, i - 1, j)) {
        neighbors.push(grid[i - 1][j]);
        orientation.push('left');
      }
      if (isValidCell(grid, i + 1, j)) {
        neighbors.push(grid[i + 1][j]);
        orientation.push('right');
      }
      if (isValidCell(grid, i, j - 1)) {
        neighbors.push(grid[i][j - 1]);
        orientation.push('bottom');
      }
      if (isValidCell(grid, i, j + 1)) {
        neighbors.push(grid[i][j + 1]);
        orientation.push('top');
      }
      return [neighbors, orientation];
    };
  }

  // Utility function to find valid cell (ie past edge)
  function isValidCell(grid, i, j) {
    if (
      grid[i] !== undefined &&
      grid[i][j] !== undefined &&
      grid[i][j].visited === false
    ) {
      return true;
    }
    return false;
  }

  function randomColor() {
    let r = p5.floor(p5.random(256));
    let g = p5.floor(p5.random(256));
    let b = p5.floor(p5.random(256));
    return [r, g, b];
  }

  let col;
  let row;
  const s = 20;
  const th = 2;

  let grid;
  let current;
  let stack = [];
  let nVisited = 0;

  const drawAll = [true, true, true, true];
  const drawNone = [false, false, false, false];
  const drawTop = [true, false, false, false];
  const drawRight = [false, true, false, false];
  const drawBot = [false, false, true, false];
  const drawLeft = [false, false, false, true];

  p5.setup = () => {
    console.log('Running initial MazeGen2D p5js setup...');
    const [width, height] = util.getCanvasDims();
    col = 20;
    row = 20;
    grid = new Array(row);

    p5.createCanvas(row * s, col * s);
    p5.background(255);
    p5.frameRate(30);

    // Initializing array grid and visual grid, empty spots
    // and blocked obstacles
    for (let i = 0; i < row; i++) {
      grid[i] = new Array(col);
      for (let j = 0; j < col; j++) {
        grid[i][j] = new Cell2D(p5, i, j, false);
        grid[i][j].draw(drawAll, [255, 255, 255], 'black');
      }
    }

    // Initializing start point, currently top-left grid
    current = grid[0][0];
    current.visited = true;
    current.draw(drawNone, 'red', 'black');
    nVisited++;
  };

  p5.draw = () => {
    // Looping draw code, recursive backtracking algorithm
    // 1. Check cell for unvisited neighbors
    //   If Unvisited
    //     1. Randomly select neighbor
    //     2. Push cell to stack
    //     3. Color visited cell and remove walls
    //     4. Update current cell and mark as visited
    //   If All Visited
    //     1. Pop cell from stack
    //     2. Make it current cell
    if (nVisited < row * col) {
      let [neighbors, orientation] = current.getNeighbors(
        grid,
        current.i,
        current.j
      );
      if (neighbors.length > 0) {
        let rand = p5.floor(p5.random(neighbors.length));
        let next = neighbors[rand];
        let dir = orientation[rand];

        current.draw(drawNone, [255, 0, 0], '');
        next.draw(drawNone, randomColor(), '');
        switch (dir) {
          case 'left':
            current.draw(drawLeft, '', 'red');
            next.draw(drawRight, '', 'red');
            break;
          case 'right':
            current.draw(drawRight, '', 'red');
            next.draw(drawLeft, '', 'red');
            break;
          case 'bottom':
            current.draw(drawTop, '', 'red');
            next.draw(drawBot, '', 'red');
            break;
          case 'top':
            current.draw(drawBot, '', 'red');
            next.draw(drawTop, '', 'red');
            break;
          default:
            break;
        }

        current = next;
        current.visited = true;
        nVisited++;

        stack.push(current);
      } else {
        current.draw(drawNone, [255, 0, 0], '');
        current = stack.pop();
        current.draw(drawNone, [0, 255, 0], '');
      }
    } else {
      current.draw(drawNone, [255, 0, 0], '');
      p5.noLoop();
    }
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {
    if (props.loop) {
      p5.loop();
    } else {
      p5.noLoop();
    }
  };

  p5.windowResized = () => {
    const [width, height] = util.getCanvasDims();
    p5.resizeCanvas(width, height);
  };
}

export default MazeGen2D;
