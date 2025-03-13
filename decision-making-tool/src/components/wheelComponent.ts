import { title } from 'process';
import { CIRCLE, RADIAN } from '../constants/constants';
import type { SegmentAngle } from '../types/segmentAngle';
import type { State } from '../types/state';
import BaseComponent from '../utils/baseComponent';
import { timeStamp } from 'console';

export class WheelComponent extends BaseComponent<'canvas'> {
  private width = 0;
  private height = 0;

  private ctx: CanvasRenderingContext2D;
  private radius = 0;
  private segments: State[];
  private totalWeight: number;
  private initAngle: number;

  private resultAngle: number = 0;

  private segmentsAngles: SegmentAngle[] = [];

  constructor(stateOptions: State[]) {
    super({ tag: 'canvas', className: 'wheel' });

    this.initAngle = Math.random() * 10;
    console.log((this.initAngle * 180) / Math.PI);
    console.log(this.segmentsAngles);

    this.segments = stateOptions;
    this.totalWeight = this.segments.reduce((sum, segment) => {
      if (segment.weight) {
        sum += segment.weight;
      }
      return sum;
    }, 0);

    this.ctx = this.getNode().getContext('2d')!;
    this.calculateSegments();
    this.updateSize();
  }

  public calculateSegments(): void {
    let initAngle = 0;
    const angles = this.segments.map((el) => {
      const obj = {
        id: 0,
        title: '',
        startAngle: 0,
        endAngle: 0,
      };
      if (el.weight && el.title) {
        obj.id = el.id;
        obj.title = el.title;
        obj.startAngle = initAngle;
        obj.endAngle = obj.startAngle + (el.weight / this.totalWeight) * CIRCLE;
        initAngle = obj.endAngle;
      }
      return obj;
    });
    this.segmentsAngles = angles;
    console.log(this.segmentsAngles);
  }

  public updateSize(): void {
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    this.width = this.getNode().width = size;
    this.height = this.getNode().height = size;
    this.radius = this.width / 3;
    this.drawWheel(this.initAngle);
  }

  public rotate(durationInSec: number): void {
    const rotationsCount = Math.random() * (5 * durationInSec - 1) + 2;
    this.resultAngle = (rotationsCount * CIRCLE) % CIRCLE;
    this.rotateAnimation(durationInSec, rotationsCount);
  }

  private rotateAnimation(durationInSec: number, rotationsCount: number): void {
    let start: number;

    const rotate = (timeStamp: number): void => {
      if (!start) {
        start = timeStamp;
      }

      let timeFraction = (timeStamp - start) / durationInSec / 1000;
      console.log(timeFraction);
      if (timeFraction > 1) timeFraction = 1;

      const progress = easeInOutCubic(timeFraction);

      function easeInOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      }

      // function easeOutBack(x: number): number {
      //   const c1 = 1.70158;
      //   const c3 = c1 + 1;

      //   return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
      //   }

      const angle = progress * CIRCLE * rotationsCount + this.initAngle;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.resultAngle = CIRCLE - (angle % CIRCLE);
      this.showCurrentSegment(this.resultAngle);
      this.drawWheel(angle);

      if (timeFraction < 1) {
        requestAnimationFrame(rotate);
      } else {
        this.initAngle = angle;
      }
    };

    requestAnimationFrame(rotate);
  }

  // private rotateAnimation(
  //   durationInSec: number,
  //   rotationsCount: number,
  // ): void {
  //   let start: number;

  //   const rotate = (timeStamp: number): void => {
  //     if (!start) {
  //       start = timeStamp;
  //     }

  //     let timeFraction = (timeStamp - start) / durationInSec;
  //     if (timeFraction > 1) timeFraction = 1

  //     let progress = timeFraction;
  //     const elapsedTime = timeStamp - start;

  //     const angle =
  //     ((elapsedTime / durationInSec) * CIRCLE * rotationsCount) / 1000;
  //     this.ctx.clearRect(0, 0, this.width, this.height);
  //     this.resultAngle = CIRCLE - angle % CIRCLE;
  //     this.showCurrentSegment(this.resultAngle);
  //     this.drawWheel(angle);

  //     if (elapsedTime < durationInSec * 1000) {
  //       requestAnimationFrame(rotate);
  //     }
  //   }

  //   requestAnimationFrame(rotate);
  // }

  private drawWheel(startPosition: number): void {
    const colors = ['red', 'green', 'blue', 'purple', 'cyan', 'lime', 'yellow'];

    this.segmentsAngles.forEach((segment, index) => {
      this.drawSegment(
        segment.startAngle + startPosition,
        segment.endAngle + startPosition,
        colors[index],
        segment.title,
      );
    });

    this.drawArrow();
  }

  private drawSegment(
    start: number,
    end: number,
    color: string,
    title: string,
  ): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, this.height / 2);
    this.ctx.arc(this.width / 2, this.height / 2, this.radius, start, end);
    this.ctx.fillStyle = color;
    this.ctx.fill();

    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.rotate((start + end) / 2);
    this.ctx.fillStyle = 'black';
    this.ctx.font = `${this.width / 30}px Montserrat`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(title, this.radius / 1.5, 0);
    this.ctx.restore();
  }

  private drawArrow(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.width - this.width / 5, this.width / 2);
    this.ctx.lineTo(
      this.width - this.width / 5 + this.width / 20,
      this.width / 2 + this.width / 50,
    );
    this.ctx.lineTo(
      this.width - this.width / 5 + this.width / 20,
      this.width / 2 - this.width / 50,
    );
    this.ctx.closePath();
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  }

  private showCurrentSegment(angle: number): void {
    console.log(
      this.segmentsAngles.find(
        (el) => el.startAngle < angle && angle < el.endAngle,
      )?.title,
    );
  }
}
