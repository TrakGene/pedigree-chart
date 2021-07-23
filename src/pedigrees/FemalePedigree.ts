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
  addDiseaseShape(diseaseShape, color) {
    let shape = {
      diseaseShape: diseaseShape,
      diseaseColor: color,
      shapeInstance: new FemaleShape(this.ctx, this)
    }
    this.shapes.push(shape)
    this.drawDiseaseShape();
  }
}
