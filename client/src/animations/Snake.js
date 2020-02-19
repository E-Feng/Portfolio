import * as util from './util';

function Snake(p5) {
  const s = 10;

  // Snake function/class
  function Snek(p5) {
    this.x = 0;
    this.y = Math.round(inHeight / 2);
    this.xDir = s;
    this.yDir = 0;

    this.setDir = (x, y) => {
      if (
        Math.abs(x) !== Math.abs(this.xDir) &&
        Math.abs(y) !== Math.abs(this.yDir)
      ) {
        this.xDir = x;
        this.yDir = y;
      }
    };

    this.update = () => {
      this.x += this.xDir;
      this.y += this.yDir;
    };

    this.show = () => {
      p5.rect(this.x, this.y, s, s);
    };
  }

  function initSnake() {
    snake = new Snek(p5);
  }

  console.log('Starting up Snake p5js...');
  let inWidth;
  let inHeight;
  let tWidth;
  let tHeight;
  let snake;

  p5.setup = () => {
    console.log('Running initial Snake p5js setup...');
    const [width, height] = util.getCanvasDims();
    [inWidth, inHeight, tWidth, tHeight] = util.getInternalCanvasDims(
      width,
      height,
      s
    );

    p5.createCanvas(width, height);
    p5.background(0);
    p5.stroke(255);
    p5.noFill();

    initSnake();
  };

  p5.draw = () => {
    p5.background(0);
    p5.translate(tWidth, tHeight);
    p5.strokeWeight(1);
    p5.rect(0, 0, inWidth, inHeight);
    p5.strokeWeight(2);

    snake.update();
    snake.show();
  };

  p5.keyPressed = () => {
    switch (p5.keyCode) {
      case p5.LEFT_ARROW:
        snake.setDir(-s, 0);
        break;
      case p5.RIGHT_ARROW:
        snake.setDir(s, 0);
        break;
      case p5.UP_ARROW:
        snake.setDir(0, -s);
        break;
      case p5.DOWN_ARROW:
        snake.setDir(0, s);
        break;
      default:
        break;
    }
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {
    p5.loop();
    if (!props.loop) {
      p5.noLoop();
    }

    if (props.reset) {
      initSnake();
    }
  };

  p5.windowResized = () => {
    const [width, height] = util.getCanvasDims();
    p5.resizeCanvas(width, height);
  };
}

export default Snake;
