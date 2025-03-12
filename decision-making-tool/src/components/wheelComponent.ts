import type { State } from '../types/state';
import BaseComponent from '../utils/baseComponent';

export class WheelComponent extends BaseComponent<'canvas'> {
  private width;
  private height;

  private ctx;
  private radius = 150;
  private segments;
  private totalWeight;

  constructor(stateOptions: State[]) {
    super({ tag: 'canvas', className: 'wheel' });

    this.segments = stateOptions;
    this.totalWeight = this.segments.reduce((sum, segment) => {
      if (segment.weight) {
        sum += segment.weight;
      }
      return sum;
    }, 0);

    this.width = this.getNode().width = 500;
    this.height = this.getNode().height = 500;
    this.ctx = this.getNode().getContext('2d')!;
    this.drawWheel();
  }

  private drawWheel(): void {
    let start = 0;
    const colors = ['red', 'green', 'blue'];

    this.segments.forEach((segment, index) => {
      if (segment.weight && segment.title) {
        const angle = (segment.weight / this.totalWeight) * Math.PI * 2;
        const end = angle + start;
        this.drawSegment(start, end, colors[index], segment.title);
        start = end;
      }
    });
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
    this.ctx.font = '15pt Montserrat';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(title, this.radius / 1.5, 0);
    this.ctx.restore();
  }
}
