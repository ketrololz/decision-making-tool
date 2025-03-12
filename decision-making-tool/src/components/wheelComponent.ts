import type { State } from '../types/state';
import BaseComponent from '../utils/baseComponent';

export class WheelComponent extends BaseComponent<'canvas'> {
  private width = 0;
  private height = 0;

  private ctx;
  private radius = 0;
  private segments;
  private totalWeight;
  private initAngle;

  constructor(stateOptions: State[]) {
    super({ tag: 'canvas', className: 'wheel' });
    this.initAngle = Math.floor(Math.random() * 10);

    this.segments = stateOptions;
    this.totalWeight = this.segments.reduce((sum, segment) => {
      if (segment.weight) {
        sum += segment.weight;
      }
      return sum;
    }, 0);

    this.ctx = this.getNode().getContext('2d')!;
    this.updateSize();
  }

  public updateSize(): void {
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.8
    this.width = this.getNode().width = size;
    this.height = this.getNode().height = size;
    this.radius = this.width / 3;
    this.drawWheel(this.initAngle);
  }
  
  public rotate(durationInSec: number): void {
    const initTime = Date.now();
    const rotationsCount =  Math.random() * (5 * durationInSec - 2 + 1) + 2;
    this.rotateAnimation(durationInSec, initTime, rotationsCount);
    
  }

  private rotateAnimation(durationInSec: number, initTime: number, rotationsCount: number): void {
    const rotationTime = Date.now() - initTime;
    if (rotationTime > durationInSec * 1000) {
      return;
    }
    
    const angle = ((rotationTime / durationInSec) * Math.PI * rotationsCount) / 1000;
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.drawWheel(angle);

    window.requestAnimationFrame(() => {
      this.rotateAnimation(durationInSec, initTime, rotationsCount);
    })
  }


  private drawWheel(startPosition: number): void {
    let start = startPosition;
    const colors = ['red', 'green', 'blue', 'purple', 'cyan', 'lime', 'yellow'];

    this.segments.forEach((segment, index) => {
      if (segment.weight && segment.title) {
        const angle = (segment.weight / this.totalWeight) * Math.PI * 2;
        const end = angle + start;
        this.drawSegment(start, end, colors[index], segment.title);
        start = end;
      }
    });

    this.drawArrow();
  }

  private drawSegment(start: number, end: number, color: string, title: string): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, this.height / 2);
    this.ctx.arc(this.width / 2, this.height / 2, this.radius, start, end);
    this.ctx.fillStyle = color;
    this.ctx.fill();

    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.rotate((start + end) / 2);
    this.ctx.fillStyle = 'white';
    this.ctx.font = `${this.width / 30}px Montserrat`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(title, this.radius / 1.5, 0);
    this.ctx.restore();
  }

  private drawArrow(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, this.width / 5);
    this.ctx.lineTo(this.width / 2 - (this.width / 40), this.width / 7);
    this.ctx.lineTo(this.width / 2 + (this.width / 40), this.width / 7);
    this.ctx.closePath();
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  }
}
