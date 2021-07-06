import camera from "./Camera";
import eventBus from "./EventBus";
import { BasePedigree } from "./Pedigree";

interface LabelData {
  id: string;
  name: string;
  surname: string;
  age: string;
}
export class Label {
  private ctx: CanvasRenderingContext2D;
  private pedigree: BasePedigree;
  private labelData: LabelData;
  private lineHeight = 20;
  constructor(ctx: CanvasRenderingContext2D, pedigree: BasePedigree) {
    this.ctx = ctx;
    this.pedigree = pedigree;
    this.labelData = {
      id: "",
      name: "",
      surname: "",
      age: "",
    };
  }
  drawLabel() {
    const pedSize = this.pedigree.size;
    this.ctx.fillStyle = "black";
    const idCenter =
      this.ctx.measureText(this.labelData.id).width / 2 - pedSize / 2;
    const nameCenter =
      this.ctx.measureText(this.labelData.name + " " + this.labelData.surname)
        .width /
        2 -
      pedSize / 2;
    const ageCenter =
      this.ctx.measureText(this.labelData.age).width / 2 - pedSize / 2;
    this.ctx.fillText(
      `${this.labelData.id}`,
      this.pedigree.x + camera.OffsetX - idCenter,
      this.pedigree.y + camera.OffsetY + 80
    );
    this.ctx.fillText(
      `${this.labelData.name + " " + this.labelData.surname}`,
      this.pedigree.x + camera.OffsetX - nameCenter,
      this.pedigree.y + camera.OffsetY + 80 + this.lineHeight
    );
    this.ctx.fillText(
      `${this.labelData.age}`,
      this.pedigree.x + camera.OffsetX - ageCenter,
      this.pedigree.y + camera.OffsetY + 80 + this.lineHeight * 2
    );
  }
  setLabel(newState) {
    Object.keys(newState).forEach((prop) => {
      this.labelData[prop] = newState[prop];
    });
    eventBus.emit("redraw");
  }
}
