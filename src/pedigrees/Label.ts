import camera from "../Camera";
import eventBus from "../EventBus";
import BasePedigree from "./BasePedigree"

interface LabelData {
  id: string;
  name: string;
  age: string;
}

export default class Label {
  private ctx: CanvasRenderingContext2D;
  private pedigree: BasePedigree;
  private labelData: LabelData;
  private lineHeight = 0;
  private offsetFromPedigree = 75
  constructor(ctx: CanvasRenderingContext2D, pedigree: BasePedigree) {
    this.ctx = ctx;
    this.pedigree = pedigree;
    this.labelData = {
      id: "",
      name: "",
      age: "",
    };
  }

  private longestString() {
    let maxWidth = 0;
    Object.keys(this.labelData).forEach((key) => {
      if (this.ctx.measureText(this.labelData[key]).width > maxWidth) {
        maxWidth = this.ctx.measureText(this.labelData[key]).width;
      }
    });
    return maxWidth;
  }

  private longestStringCenter() {
    return this.longestString() / 2 - this.pedigree.size / 2;
  }

  private calculateBackgroundHeight() {
    let height = 0;
    Object.keys(this.labelData).forEach((key) => {
      if (this.labelData[key] !== "") {
        height += 20;
      }
    });
    return height;
  }

  drawLabel() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.pedigree.x + camera.OffsetX - this.longestStringCenter(),
      this.pedigree.y + camera.OffsetY + this.offsetFromPedigree,
      this.longestString(),
      this.calculateBackgroundHeight()
    );
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.fillStyle = "black";

    Object.keys(this.labelData).forEach((key) => {
      if (this.labelData[key] !== "") {
        const center =
          this.ctx.measureText(this.labelData[key]).width / 2 -
          this.pedigree.size / 2;
        this.ctx.fillText(
          `${this.labelData[key]}`,
          this.pedigree.x + camera.OffsetX - center,
          this.pedigree.y + camera.OffsetY + this.offsetFromPedigree+16 + this.lineHeight
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
}
