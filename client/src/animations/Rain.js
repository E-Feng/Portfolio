function Rain(p5) {
  function Drop(p5) {
    this.initDrop = () => {
      const zMax = 5;
      this.x = p5.random(p5.width);
      this.y = p5.random(-500, -100);
      this.z = p5.random(0, zMax);
      this.len = p5.map(this.z, 0, zMax, 10, 20);
      this.g = p5.map(this.z, 0, zMax, 4, 10);
    };

    this.fall = () => {
      this.y += this.g;
      if (this.y > p5.height) {
        this.initDrop();
      }
    };

    this.show = () => {
      p5.stroke(255);
      p5.line(this.x, this.y, this.x, this.y + this.len);
    };

    this.initDrop();
  }

  console.log('Starting up Rain p5js...');

  let drops = [];

  p5.setup = () => {
    console.log('Running initial Rain p5js setup...');
    const canvasDiv = document.getElementsByClassName('p5Canvas')[0]
      .parentElement;
    canvasDiv.style.display = 'flex';

    const width = canvasDiv.parentElement.clientWidth;
    const height = canvasDiv.parentElement.clientHeight;

    p5.createCanvas(width, height);
    p5.background(0);
    p5.frameRate(60);

    const nDrops = Math.round((width * height) / 4000);

    for (let i = 0; i < nDrops; i++) {
      drops.push(new Drop(p5));
    }
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {
    if (props.loop) {
      p5.loop();
    } else {
      p5.noLoop();
    }
  };

  p5.draw = () => {
    p5.background(0);
    drops.forEach(drop => {
      drop.fall();
      drop.show();
    });

    //console.log(p5.mouseX);
  };
}

export default Rain;
