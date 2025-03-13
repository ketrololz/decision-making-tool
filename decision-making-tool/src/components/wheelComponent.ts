
import { CIRCLE} from '../constants/constants';
import BaseComponent from '../utils/baseComponent';
import type { WheelItem } from '../types/wheelItem';

type WheelSegment = {
  startAngle: number;
  endAngle: number;
} & WheelItem;

type SegmentMap = Record<number, WheelSegment>;

export class WheelComponent extends BaseComponent<'canvas'> {
  private width = 0;
  private height = 0;

  private ctx: CanvasRenderingContext2D;
  private radius = 0;
  private segments: SegmentMap;
  private initAngle: number;
  private thisCurrentTitle: string | undefined;

  private resultAngle: number = 0;

  // private onUpdate: (element: HTMLElement, text: string) => void;

  constructor(stateOptions: WheelItem[], private onUpdate: (text: string) => void) {
    super({ tag: 'canvas', className: 'wheel' });

    this.initAngle = Math.random() * 10;
    this.ctx = this.getNode().getContext('2d')!;
    this.segments = this.calculateSegments(stateOptions);
    this.updateSize();
  }

  public calculateSegments(items: WheelItem[]): SegmentMap {
    let initAngle = 0;

    const totalWeight = items.reduce((sum, segment) => {
      if (segment.weight) {
        sum += segment.weight;
      }
      return sum;
    }, 0);

    return items.reduce<SegmentMap>((acc, el) => {
      const obj = {
        ...el,
        startAngle: initAngle,
        endAngle: initAngle + (el.weight / totalWeight) * CIRCLE,
      };
      acc[el.id] = obj;
      initAngle = obj.endAngle;
      return acc;
    }, {});
  }

  public updateSize(): void {
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    this.width = this.getNode().width = size;
    this.height = this.getNode().height = size;
    this.radius = this.width / 3;
    this.drawWheel(this.initAngle);
  }

  public rotate(durationInSec: number): void {
    const rotationsCount = Math.random() * (3 * durationInSec - 1) + 2;
    this.resultAngle = (rotationsCount * CIRCLE) % CIRCLE;
    this.rotateAnimation(durationInSec, rotationsCount);
  }

  public showCurrentTitle(element: BaseComponent<'h2'>): void {
    if (this.thisCurrentTitle) {
      element.setText(this.thisCurrentTitle);
    }
  }

  private rotateAnimation(durationInSec: number, rotationsCount: number): void {
    let start: number;

    const rotate = (timeStamp: number): void => {
      if (!start) {
        start = timeStamp;
      }

      let timeFraction = (timeStamp - start) / durationInSec / 1000;
      if (timeFraction > 1) timeFraction = 1;

      const progress = easeInOutCubic(timeFraction);

      function easeInOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      }

      const angle = progress * CIRCLE * rotationsCount + this.initAngle;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.resultAngle = CIRCLE - (angle % CIRCLE);
      this.drawWheel(angle);
      const winnerSegment = this.getCurrentSegment(this.resultAngle);

      if (winnerSegment) {
        if (!(winnerSegment.title === this.thisCurrentTitle)) {
          this.thisCurrentTitle = winnerSegment.title;
          this.onUpdate(winnerSegment.title);
        }
      }

      if (timeFraction < 1) {
        requestAnimationFrame(rotate);
      } else {
        this.initAngle = angle;

        // delete mode

        // if (winnerSegment) {
        //   delete this.segments[winnerSegment.id];
        // }
        // this.segments = this.calculateSegments(Object.values(this.segments));
      }
    };

    requestAnimationFrame(rotate);
  }

  // private deleteSegment(): {
  //   if (winnerSegment) {
  //     delete this.segments[winnerSegment.id];
  //   }
  //   this.segments = this.calculateSegments(Object.values(this.segments));
  // }

  private drawWheel(startPosition: number): void {
    const colors = ['red', 'green', 'blue', 'purple', 'cyan', 'lime', 'yellow'];

    Object.values(this.segments).forEach((segment, index) => {
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

  private getCurrentSegment(angle: number): WheelSegment | undefined {
    return Object.values(this.segments).find(
      (el) => el.startAngle < angle && angle < el.endAngle,
    );
  }
}
