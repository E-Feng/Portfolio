import * as util from './util';

function Snake(p5) {
  const s = 10;

  // Snake function/class
  function Snek(p5) {
    this.x = 0;
    this.y = util.roundDownToS(inHeight / 2, s);
    this.body = [];
    this.xDir = s;
    this.yDir = 0;
    [this.xFood, this.yFood] = generateFood();

    this.setDir = (x, y) => {
      if (
        Math.abs(x) !== Math.abs(this.xDir) &&
        Math.abs(y) !== Math.abs(this.yDir)
      ) {
        this.xDir = x;
        this.yDir = y;
      }
    };

    this.getPosAndDir = () => {
      return [this.x, this.y, this.xDir, this.yDir];
    };

    this.update = auto => {
      // Update direction of its segments
      this.body.unshift([-this.xDir, -this.yDir]);
      this.body.pop();

      this.x += this.xDir;
      this.y += this.yDir;

      // Check if food is eaten
      if (this.x === this.xFood && this.y === this.yFood) {
        const last = this.body.slice(-1)[0] || [this.xDir, this.yDir];
        this.body.push(last);
        [this.xFood, this.yFood] = generateFood();
      }

      if (auto) {
        // Brute force check approach, never run into itself if possible
        const neighbors = [
          [s, 0],
          [-s, 0],
          [0, s],
          [0, -s]
        ];
        const spotDist = neighbors.map(pos => {
          const spot = [this.x + pos[0], this.y + pos[1]];
          let val = p5.dist(spot[0], spot[1], this.xFood, this.yFood);
          let x = this.x;
          let y = this.y;
          if (this.body) {
            this.body.forEach(seg => {
              x += seg[0];
              y += seg[1];
              if (x === spot[0] && y === spot[1]) {
                val = Infinity;
              }
            });
          }
          return val;
        });
        const spotDistNorm = spotDist.map(x => {
          return x + p5.random();
        })
        const index = spotDistNorm.reduce(
          (best, x, i, arr) => (x < arr[best] ? i : best),
          0
        );

        this.setDir(neighbors[index][0], neighbors[index][1]);
      }

      // Auto movement, purely movement algorithm not perfect
      // if (auto) {
      //   let xMove = 0;
      //   let yMove = 0;
      //   const xDiff = this.x - this.xFood;
      //   const yDiff = this.y - this.yFood;

      //   const ratio = Math.abs(xDiff) / (Math.abs(xDiff) + Math.abs(yDiff));

      //   let sum = (r, a) => r.map((b, i) => a[i] + b);
      //   const sumBody = this.body.length ? this.body.reduce(sum) : [0, 0];

      //   if (p5.random() < ratio) {
      //     xMove = xDiff > 0 ? -s : s;
      //     if (util.oppositeSign(xMove, this.xDir)) {
      //       xMove = 0;
      //       yMove = sumBody[1] > 0 ? -s : s;
      //     }
      //   } else {
      //     yMove = yDiff > 0 ? -s : s;
      //     if (util.oppositeSign(yMove, this.yDir)) {
      //       xMove = sumBody[0] > 0 ? -s : s;
      //       yMove = 0;
      //     }
      //   }
      //   this.setDir(xMove, yMove);
      //}
    };

    this.show = () => {
      // Drawing Snake
      p5.noFill();
      p5.rect(this.x, this.y, s, s);
      let x = this.x;
      let y = this.y;
      let color = 255;
      this.body.forEach(seg => {
        x += seg[0];
        y += seg[1];
        p5.stroke(color);
        p5.rect(x, y, s, s);
        color = Math.max(50, color - 0.5);
      });

      // Drawing food
      p5.fill(255);
      p5.rect(this.xFood, this.yFood, s, s);
    };

    this.hasDied = () => {
      // Running into the walls
      if (this.x < 0 || this.y < 0 || this.x >= inWidth || this.y >= inHeight) {
        return true;
      }

      // Running into itself
      let dead = false;
      let x = this.x;
      let y = this.y;
      this.body.forEach(seg => {
        x += seg[0];
        y += seg[1];
        if (this.x === x && this.y === y) {
          dead = true;
        }
      });
      return dead;
    };

    function generateFood() {
      const xFood = util.roundDownToS(p5.random(inWidth), s);
      const yFood = util.roundDownToS(p5.random(inHeight), s);
      return [xFood, yFood];
    }
  }

  function initSnake() {
    snake = new Snek(p5);
    auto = true;
  }

  console.log('Starting up Snake p5js...');
  let inWidth;
  let inHeight;
  let tWidth;
  let tHeight;
  let snake;
  let auto = true;

  p5.setup = () => {
    const [width, height] = util.getCanvasDims();
    [inWidth, inHeight, tWidth, tHeight] = util.getInternalCanvasDims(
      width,
      height,
      s
    );

    p5.createCanvas(width, height);
    p5.background(0);
    p5.frameRate(30);
    p5.stroke(255);
    p5.noFill();

    initSnake();
  };

  p5.draw = () => {
    p5.noFill();
    p5.background(0);
    p5.strokeWeight(1);
    p5.translate(tWidth, tHeight);
    p5.rect(0, 0, inWidth, inHeight);
    p5.stroke(255);
    p5.strokeWeight(2);

    snake.show();
    snake.update(auto);
    if (snake.hasDied()) {
      initSnake();
    }
  };

  p5.keyPressed = () => {
    switch (p5.keyCode) {
      case p5.LEFT_ARROW:
        auto = false;
        snake.setDir(-s, 0);
        break;
      case p5.RIGHT_ARROW:
        auto = false;
        snake.setDir(s, 0);
        break;
      case p5.UP_ARROW:
        auto = false;
        snake.setDir(0, -s);
        break;
      case p5.DOWN_ARROW:
        auto = false;
        snake.setDir(0, s);
        break;
      default:
    }
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {
    p5.loop();
    if (!props.loop) {
      p5.noLoop();
    }

    if (props.reset) {
      initSnake();
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
  };
}

export default Snake;
