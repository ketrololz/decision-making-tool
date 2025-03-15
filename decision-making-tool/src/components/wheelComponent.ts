import { CIRCLE, MAX_TITLE_LENGTH, WHEEL_SIZE_RATIO } from '../constants/constants';
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
  private isEliminationMode = false;

  constructor(
    stateOptions: WheelItem[],
    private onUpdate: (text: string) => void,
  ) {
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
    const size = Math.min(window.innerWidth, window.innerHeight) * WHEEL_SIZE_RATIO;
    this.width = this.getNode().width = size;
    this.height = this.getNode().height = size;
    this.radius = this.width / 2.2;
    this.drawWheel(this.initAngle);
  }

  public async rotate(durationInSec: number): Promise<void> {
    const rotationsCount = Math.random() * (3 * durationInSec - 1) + 2;
    this.resultAngle = (rotationsCount * CIRCLE) % CIRCLE;
    await this.rotateAnimation(durationInSec, rotationsCount);
  }

  public showCurrentTitle(element: BaseComponent<'h2'>): void {
    if (this.thisCurrentTitle) {
      element.setText(this.thisCurrentTitle);
    }
  }

  public toggleEliminationMode(): boolean {
    return (this.isEliminationMode =
      this.isEliminationMode === false ? true : false);
  }

  private rotateAnimation(
    durationInSec: number,
    rotationsCount: number,
  ): Promise<void> {
    return new Promise((resolve) => {
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

          if (this.isEliminationMode && Object.keys(this.segments).length > 2) {
            if (winnerSegment) {
              delete this.segments[winnerSegment.id];
            }
            this.segments = this.calculateSegments(
              Object.values(this.segments),
            );
          }

          resolve();
        }
      };

      requestAnimationFrame(rotate);
    });
  }

  private drawWheel(startPosition: number): void {
    const colors = ['#e25e52', '#73cf52', '#dbcb33', '#35bad8', '#9459c6'];
    let colorNum = 0;
    Object.values(this.segments).forEach((segment) => {
      this.drawSegment(
        segment.startAngle + startPosition,
        segment.endAngle + startPosition,
        colors[colorNum],
        segment.title,
      );
      if (colorNum >= 4) {
        colorNum = 1;
      }
      colorNum += 1;
    });

    this.ctx.beginPath();
    this.ctx.moveTo(this.width - this.width / 22, this.height / 2);
    this.ctx.arc(this.width / 2, this.height / 2, this.radius, 0, CIRCLE);
    this.ctx.save();
    this.ctx.clip();
    this.ctx.lineWidth = this.width / 15;
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.stroke();
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.moveTo(this.width - this.width / 22, this.height / 2);
    this.ctx.arc(this.width / 2, this.height / 2, this.radius / 30, 0, CIRCLE);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.restore();

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
    // this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
    // this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    // this.ctx.shadowBlur = 10;
    const trimmedTitle = title.trim();
    let shortTitle = trimmedTitle 
    if(trimmedTitle .length > MAX_TITLE_LENGTH) {
      shortTitle = trimmedTitle .slice(-MAX_TITLE_LENGTH).concat('...');
    }

    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.rotate((start + end) / 2);
    this.ctx.fillStyle = 'black';
    this.ctx.font = `${this.width / 34}px Montserrat`;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(shortTitle, this.radius / 4, 0);
    this.ctx.restore();
  }

  private drawArrow(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.width - this.width / 10, this.width / 2);
    this.ctx.lineTo(
      this.width - this.width / 5 + this.width / 6,
      this.width / 2 + this.width / 30,
    );
    this.ctx.lineTo(
      this.width - this.width / 5 + this.width / 6,
      this.width / 2 - this.width / 30,
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
