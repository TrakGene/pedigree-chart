import BasePedigree from "./BasePedigree";
import Camera from "../Camera";
import MaleShape from "../diseaseShapes/MaleShapes";

export default class MalePedigree extends BasePedigree {
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
  drawPedigree() {
    this.initShape();
    this.drawDiseaseShape();
    this.label.drawLabel();
  }
  setDiseaseShape(shape, color) {
    this.diseaseShape = shape;
    this.diseaseColor = color;
    this.shape = new MaleShape(this.ctx, this);
    this.drawDiseaseShape();
  }
  drawDiseaseShape() {
    if (this.shape) {
      switch (this.diseaseShape) {
        case "dot":
          this.shape.drawDot(this.diseaseColor);
      }
    }
  }
  updateConfig() {}
  setLabel(obj) {
    this.label.setLabel(obj);
  }
}
