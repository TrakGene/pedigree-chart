import EventBus from "../EventBus";
import IdGenerator from "../IdGenerator";
import Label from "./Label";
import Shape from "../diseaseShapes/Shape";

export default abstract class BasePedigree {
  protected label: Label;
  protected shape: Shape;
  protected ctx: CanvasRenderingContext2D;
  readonly id = IdGenerator.randomId();
  protected isMarried = false;
  protected diseaseShape = "";
  protected diseaseColor = "";
  dragEnabled = false;
  twin = null;
  marriagePartner = null;
  storage: any;
  size = 60;
  border = 3;
  x = 0;
  y = 0;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.label = new Label(ctx, this);
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
  abstract drawPedigree();
  abstract setDiseaseShape(shape, color);
  abstract drawDiseaseShape();
}
