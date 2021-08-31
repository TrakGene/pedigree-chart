import camera from "../Camera";
import eventBus from "../EventBus";
import BasePedigree from "./BasePedigree";

interface LabelData {
  value: string;
  order: number;
}

export default class Label {
  private ctx: CanvasRenderingContext2D;
  private pedigree: BasePedigree;
  private labelData: LabelData[];
  private lineHeight = 0;
  private offsetFromPedigree = 75;
  constructor(ctx: CanvasRenderingContext2D, pedigree: BasePedigree) {
    this.ctx = ctx;
    this.pedigree = pedigree;
    this.labelData = [];
  }

  private longestString() {
    let maxWidth = 0;
    this.labelData.forEach((data: LabelData) => {
      if (this.ctx.measureText(data.value).width > maxWidth) {
        maxWidth = this.ctx.measureText(data.value).width;
      }
    });
    return maxWidth;
  }

  private longestStringCenter() {
    return this.longestString() / 2 - this.pedigree.size / 2;
  }

  private calculateBackgroundHeight() {
    let height = 0;
    return height;
  }

  public drawLabel() {
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
    this.labelData.forEach((data: LabelData) => {
      const center =
        this.ctx.measureText(data.value).width / 2 - this.pedigree.size / 2;
      this.ctx.fillText(
        `${data.value}`,
        this.pedigree.x + camera.OffsetX - center,
        this.pedigree.y +
          camera.OffsetY +
          this.offsetFromPedigree +
          16 +
          this.lineHeight
      );
      this.lineHeight += 20;
    });
    this.lineHeight = 0;
  }

  public setLabel(newData: LabelData[]) {
    newData.sort((a, b) => (a.order > b.order) as any);
    this.labelData = newData;
    eventBus.emit("redraw");
  }
}
