import EventBus from "../EventBus";
import Label from "./Label";
import Shape from "../diseaseShapes/Shape";

export default abstract class BasePedigree {
  protected label: Label;
  protected shape: Shape;
  protected ctx: CanvasRenderingContext2D;
  protected isMarried = false;
  protected diseaseShape = "";
  protected diseaseColor = "";
  fillColor = "white"
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
  drawDiseaseShape() {
    if (this.shape) {
      switch (this.diseaseShape) {
        case "dot":
          this.shape.drawDot(this.diseaseColor);
          break;
        case "fill":
          this.shape.fillColor(this.diseaseColor);
          break;
        case "q1":
          this.shape.fillFirstQuarterColor(this.diseaseColor);
          break;
        case "q2":
          this.shape.fillSecondQuarterColor(this.diseaseColor);
          break;
        case "q3":
          this.shape.fillThirdQuarterColor(this.diseaseColor);
          break;
        case "q4":
          this.shape.fillFourthQuarterColor(this.diseaseColor);
          break;
      }
    }
  }
  setLabel(obj) {
    this.label.setLabel(obj);
  }
  drawPedigree() {
    this.initShape();
    this.drawDiseaseShape();
    this.label.drawLabel();
  }
  abstract initShape();
  abstract setDiseaseShape(shape, color);
}
