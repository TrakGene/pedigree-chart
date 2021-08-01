import EventBus from "../EventBus";
import Label from "./Label";
import Shape from "../diseaseShapes/Shape";
import camera from "../Camera";
import IdGenerator from "../IdGenerator"

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
  private storage: any;
  id: number = null;
  fillColor = "white"
  dragEnabled = false;
  isInLegend = false;
  twin = null;
  marriagePartner = null;
  size = 60;
  border = 3;
  x = 0;
  y = 0;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.id = IdGenerator.getId()
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.label = new Label(ctx, this);
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
  public setLabel(obj: any) {
    this.label.setLabel(obj);
  }
  public setStorage(obj: any) {
    this.storage = obj
  }
  public getStorage() {
    return this.storage
  } 
  public draw() {
    this.initShape();
    this.drawDiseaseShape();
    this.label.drawLabel();
  }
  public getMidX() {
    return this.calculateMiddle().x + camera.OffsetX
  }
  public getMidY() {
    return this.calculateMiddle().y + camera.OffsetY
  }
  public getX() {
    return this.x + camera.OffsetX
  }
  public getY() {
    return this.y + camera.OffsetY
  }
  public calculateMiddle() {
    return {
      x: this.x + this.size / 2,
      y: this.y + this.size / 2,
    };
  }
  public on(eventName, eventHandler) {
    EventBus.on(`${eventName}${this}`, () => eventHandler(this));
  }
  abstract initShape();
  abstract addDiseaseShape(shape, color);
}
