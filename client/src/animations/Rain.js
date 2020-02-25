import * as util from './util';

function Rain(p5) {
  // Raindrop function/class
  function Drop(p5) {
    const zMax = 5;

    this.initDrop = () => {
      this.x = p5.random(p5.width);
      this.y = p5.random(-500, -100);
      this.z = p5.random(0, zMax);
      this.len = p5.map(this.z, 0, zMax, 10, 20);
      this.g = p5.map(this.z, 0, zMax, 4, 10);
    };

    this.fall = walls => {
      let contact = false;
      let allWalls = walls.slice();
      allWalls.push([p5.mouseX, p5.mouseY]);
      for (let wall of allWalls) {
        let curX = wall[0];
        let curY = wall[1];
        if (p5.dist(this.x, this.y, curX, curY) < rad) {
          if (this.y < curY) {
            // "Sliding" down the circular disk
            const angle = -p5.atan((curX - this.x) / (curY - this.y));

            const xShift = p5.sin(p5.abs(angle));
            const yShift = p5.cos(p5.abs(angle));
            this.x = angle > 0 ? this.x + xShift : this.x - xShift;
            this.y += yShift;

            const arcAngle = p5.degrees(this.len / rad);
            const angleStart = angle - arcAngle / 2 + 270;
            const angleEnd = angle + arcAngle / 2 + 270;

            p5.arc(curX, curY, rad * 2, rad * 2, angleStart, angleEnd);
          } else {
            // Pushing drop to the sides
            this.x = curX > this.x ? curX - rad : curX + rad;
          }
          contact = true;
          break;
        }
      }
      // Simple falling due to gravity
      if (!contact) {
        this.y += this.g;
        p5.line(this.x, this.y - this.len / 2, this.x, this.y + this.len / 2);
      }

      if (this.y > p5.height + this.len) {
        this.initDrop();
      }
    };

    this.initDrop();
  }

  console.log('Starting up Rain p5js...');
  let width;
  let height;
  let drops = [];
  let walls = [];
  let allowClick = true;
  let nDrops;
  let rad;

  function initRain(nDrops) {
    drops = [];
    walls = [];

    for (let i = 0; i < nDrops; i++) {
      drops.push(new Drop(p5));
    }
  }

  p5.setup = () => {
    [width, height] = util.getCanvasDims();

    p5.createCanvas(width, height);
    p5.background(0);
    p5.frameRate(60);
    p5.stroke(255);
    p5.strokeWeight(1);
    p5.noFill();
    p5.angleMode(p5.DEGREES);

    rad = Math.min(100, Math.round(width/8));
    nDrops = Math.round((width * height) / 1500);

    initRain(nDrops);
  };

  p5.draw = () => {
    p5.background(0);
    drops.forEach(drop => {
      drop.fall(walls);
    });
  };

  p5.mousePressed = () => {
    if (allowClick) {
      walls.push([p5.mouseX, p5.mouseY]);
      if (p5.mouseX + p5.mouseY === 0) {
        walls.pop();
      }
    }
    allowClick = true;
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {
    allowClick = false;
    p5.loop();
    if (!props.loop) {
      p5.noLoop();
    }

    if (props.reset) {
      initRain(nDrops);
      props.setReset(false);
    }
  };

  p5.windowResized = () => {
    [width, height] = util.getCanvasDims();
    rad = Math.min(100, Math.round(width/8));
    nDrops = Math.round((width * height) / 1500);
    p5.resizeCanvas(width, height);
  };
}

export default Rain;
