import EventBus from "./EventBus";
import IdGenerator from "./IdGenerator";
import Camera from "./Camera";

export abstract class BasePedigree {
  canvasDiagram: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isMarried = false;
  marriagePartner = null;
  storage: any;
  id = IdGenerator.randomId();
  size = 60;
  border = 3;
  x = 0;
  y = 0;
  scalingFactor = 1;
  dragEnabled = false;

  constructor(
    canvasDiagram: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
    this.canvasDiagram = canvasDiagram;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }
  calculateMiddle() {
    return {
      x: this.x + this.size / 2,
      y: this.y + this.size / 2,
    };
  }
  on(eventName, eventHandler) {
    EventBus.on(`${eventName}${this.id}`, () => eventHandler(this.id));
  }
  abstract initShape();
}
export class UnknownPedigree extends BasePedigree {
  initShape() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.border;
    this.ctx.strokeStyle = "black";
    const size2 = this.size / 2;
    this.ctx.moveTo(this.x + Camera.OffsetX, this.y + size2 + Camera.OffsetY);
    this.ctx.lineTo(this.x + size2 + Camera.OffsetX, this.y + Camera.OffsetY);
    this.ctx.lineTo(
      this.x + this.size + Camera.OffsetX,
      this.y + size2 + Camera.OffsetY
    );
    this.ctx.lineTo(
      this.x + size2 + Camera.OffsetX,
      this.y + this.size + Camera.OffsetY
    );
    this.ctx.lineTo(this.x + Camera.OffsetX, this.y + size2 + Camera.OffsetY);
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export class MalePedigree extends BasePedigree {
  initShape() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.x + Camera.OffsetX,
      this.y + Camera.OffsetY,
      this.size,
      this.size
    );
    this.ctx.lineWidth = this.border;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export class FemalePedigree extends BasePedigree {
  initShape() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + this.size / 2 + Camera.OffsetX,
      this.y + this.size / 2 + Camera.OffsetY,
      this.size / 2,
      0,
      2 * Math.PI
    );
    this.ctx.scale(this.scalingFactor, this.scalingFactor);
    this.ctx.lineWidth = this.border;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
