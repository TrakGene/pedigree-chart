import camera from "./Camera";
import eventBus from "./EventBus";
import { BasePedigree } from "./Pedigree";

interface LabelData {
  id: string;
  name: string;
  age: string;
}
export class Label {
  private ctx: CanvasRenderingContext2D;
  private pedigree: BasePedigree;
  private labelData: LabelData;
  private lineHeight = 0;
  constructor(ctx: CanvasRenderingContext2D, pedigree: BasePedigree) {
    this.ctx = ctx;
    this.pedigree = pedigree;
    this.labelData = {
      id: "",
      name: "",
      age: "",
    };
  }
  drawLabel() {
    this.ctx.fillStyle = "black";

    Object.keys(this.labelData).forEach((key) => {
      if (this.labelData[key] !== "") {
        const center =
          this.ctx.measureText(this.labelData[key]).width / 2 -
          this.pedigree.size / 2;
        this.ctx.fillText(
          `${this.labelData[key]}`,
          this.pedigree.x + camera.OffsetX - center,
          this.pedigree.y + camera.OffsetY + 80 + this.lineHeight
        );
        this.lineHeight += 20;
      }
    });
    this.lineHeight = 0;
  }
  setLabel(newState) {
    Object.keys(newState).forEach((prop) => {
      this.labelData[prop] = newState[prop];
    });
    eventBus.emit("redraw");
  }
  calculateBackgroundHeight() {
    Object.keys(this.labelData);
  }
}
