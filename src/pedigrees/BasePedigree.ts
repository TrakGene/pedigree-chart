import EventBus from "../EventBus";
import Label from "./Label";
import Shape from "../diseaseShapes/Shape";
import camera from "../Camera";

interface ShapeProps {
  shapeInstance: Shape;
  diseaseShape: string;
  diseaseColor: string;
}

export default abstract class BasePedigree {
  protected label: Label;
  protected shapes: ShapeProps[] = [];
  protected ctx: CanvasRenderingContext2D;
  protected isMarried = false;
  fillColor = "white"
  dragEnabled = false;
  isInLegend = false;
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
  getMidX() {
    return this.calculateMiddle().x + camera.OffsetX
  }
  getMidY() {
    return this.calculateMiddle().y + camera.OffsetY
  }
  getX() {
    return this.x + camera.OffsetX
  }
  getY() {
    return this.y + camera.OffsetY
  }
  calculateMiddle() {
    return {
      x: this.x + this.size / 2,
      y: this.y + this.size / 2,
    };
  }
  on(eventName, eventHandler) {
    EventBus.on(`${eventName}${this}`, () => eventHandler(this));
  }
  protected drawDiseaseShape() {
    if (this.shapes.length > 0) {
      this.shapes.forEach((shape: ShapeProps)=>{
        switch (shape.diseaseShape) {
          case "dot":
            shape.shapeInstance.drawDot(shape.diseaseColor);
            break;
          case "fill":
            shape.shapeInstance.fillColor(shape.diseaseColor);
            break;
          case "q1":
            shape.shapeInstance.fillFirstQuarterColor(shape.diseaseColor);
            break;
          case "q2":
            shape.shapeInstance.fillSecondQuarterColor(shape.diseaseColor);
            break;
          case "q3":
            shape.shapeInstance.fillThirdQuarterColor(shape.diseaseColor);
            break;
          case "q4":
            shape.shapeInstance.fillFourthQuarterColor(shape.diseaseColor);
            break;
        }
      })
    }
  }
  public setLabel(obj) {
    this.label.setLabel(obj);
  }
  public drawPedigree() {
    this.initShape();
    this.drawDiseaseShape();
    this.label.drawLabel();
  }
  abstract initShape();
  abstract addDiseaseShape(shape, color);
}
