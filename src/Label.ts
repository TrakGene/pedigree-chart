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
  private lineHeight = 0;
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
    this.ctx.beginPath();
    this.ctx.rect(
      this.pedigree.x + camera.OffsetX,
      this.pedigree.y + camera.OffsetY + 80,
      this.ctx.measureText(this.labelData.name + " " + this.labelData.surname).width,
      this.pedigree.size
    );
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
    
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
    if(this.labelData.id !== "") {
      this.ctx.fillText(
        `${this.labelData.id}`,
        this.pedigree.x + camera.OffsetX - idCenter,
        this.pedigree.y + camera.OffsetY + 80 + this.lineHeight
      );
      this.lineHeight += 20
    }
    if((this.labelData.name !== "") || (this.labelData.surname !== "")) {
      this.ctx.fillText(
        `${this.labelData.name + " " + this.labelData.surname}`,
        this.pedigree.x + camera.OffsetX - nameCenter,
        this.pedigree.y + camera.OffsetY + 80 + this.lineHeight
      );
      this.lineHeight += 20
    }
    if(this.labelData.age !== "") {
      this.ctx.fillText(
        `${this.labelData.age}`,
        this.pedigree.x + camera.OffsetX - ageCenter,
        this.pedigree.y + camera.OffsetY + 80 + this.lineHeight
      );
      this.lineHeight += 20
    }
    this.lineHeight = 0
  }
  setLabel(newState) {
    Object.keys(newState).forEach((prop) => {
      this.labelData[prop] = newState[prop];
    });
    eventBus.emit("redraw");
  }
}
