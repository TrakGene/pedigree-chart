import EventBus from "./EventBus";
import IdGenerator from "./IdGenerator";
import Camera from "./Camera";

export abstract class BasePedigree {
  protected ctx: CanvasRenderingContext2D;
  readonly id = IdGenerator.randomId();
  protected isMarried = false;
  dragEnabled = false;
  twin = null;
  marriagePartner = null;
  storage: any;
  size = 60;
  border = 3;
  x = 0;
  y = 0;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
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
    EventBus.on(`${eventName}${this.id}`, () => eventHandler(this));
  }
  abstract initShape();
  abstract updateConfig(configObj);
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
  updateConfig() {

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
  updateConfig() {

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
    this.ctx.lineWidth = this.border;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }
  updateConfig() {


  }
}
