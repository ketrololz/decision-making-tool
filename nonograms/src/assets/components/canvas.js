import { createElem } from "./create-element";

export class CanvasBackground {

  #canvas = null;
  #width = window.innerWidth;
  #height = window.innerHeight;
  #leaves = [];
  #leavesCount = 25;
  ctx = null;
  #colors = {
    0: '#d3ef6f',
    1: '#b4de19',
    2: '#809C18',
    3: '#52B605',
    4: '#C8C20F',
  }

  constructor() {
    this.#canvas = createElem({
      tag: 'canvas',
      parent: document.body,
      classes: ['background'],
    })

    this.#canvas.width = this.#width;
    this.#canvas.height = this.#height;

    this.ctx = this.#canvas.getContext('2d');
  }

  createLeaf() {
      return {
        angle: Math.random() * Math.PI * 2,
        x: Math.random() * this.#width,
        y: Math.random() * this.#height - 1000,
        size: Math.floor(Math.random() * (30 - 10)) + 10,
        speedY: Math.floor(Math.random() * (3 - 1)) + 1,
        rotateSpeed: Math.random() * Math.PI,
        color: this.#colors[Math.floor(Math.random() * 3)],
        blur: Math.floor(Math.random() * (3 - 1)) + 1,
        opacity: Math.random() * (0.95 - 0.1) + 0.1,
      }
    }

    createLeavesArr() {
      for (let i = 0; i < this.#leavesCount; i += 1) {
        this.#leaves.push(this.createLeaf());
    }
  }

  createLeaves() {
    for (const leaf of this.#leaves) {
      this.ctx.save();
      this.ctx.translate(leaf.x, leaf.y);
      this.ctx.rotate(leaf.angle);
      this.ctx.beginPath();

      this.ctx.bezierCurveTo((leaf.size), leaf.size, (leaf.size - (leaf.size * 1.2)), (leaf.size - (leaf.size * 0.5)), leaf.size, (leaf.size - (leaf.size * 2)));
      this.ctx.bezierCurveTo((leaf.size + (leaf.size * 1.2)), (leaf.size - (leaf.size * 0.5)), (leaf.size), (leaf.size), leaf.size, leaf.size);

      this.ctx.fillStyle = leaf.color;
      this.ctx.filter = `blur(${leaf.blur}px)`
      this.ctx.globalAlpha = leaf.opacity;
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  updatePosition() {
    this.ctx.clearRect(0, 0, this.#width, this.#height)
    for (let i = 0; i < this.#leaves.length; i += 1) {
      const leaf = this.#leaves[i];
      leaf.y += leaf.speedY;
      leaf.angle -= 0.001

      if(leaf.y > this.#height + 50) {
        this.#leaves[i] = this.createLeaf();
      }

      if(leaf.x > this.#width + 50) {
        this.#leaves[i] = this.createLeaf();
      }

    }
  }


  dropLeaves() {
    this.ctx.clearRect(0, 0, this.#width, this.#height)
    this.createLeaves('green');
    window.requestAnimationFrame(() => {
      this.updatePosition();
      this.dropLeaves();
    })
  }
}

const canvasField = new CanvasBackground();
canvasField.createLeavesArr();
canvasField.dropLeaves();
