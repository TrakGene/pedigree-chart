import BasePedigree from "./BasePedigree";
import Camera from "../Camera";
import FemaleShape from "../diseaseShapes/FemaleShapes";

export default class FemalePedigree extends BasePedigree {
  initShape() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + this.size / 2 + Camera.OffsetX,
      this.y + this.size / 2 + Camera.OffsetY,
      this.size / 2,
      0,
      2 * Math.PI
    );
    this.ctx.lineWidth = this.border;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.fillStyle = this.fillColor;
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
    this.shape = new FemaleShape(this.ctx, this);
    this.drawDiseaseShape();
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
  updateConfig() {}
  setLabel(obj) {
    this.label.setLabel(obj);
  }
}
