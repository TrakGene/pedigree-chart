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
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
    this.ctx.closePath();
  }
  addDiseaseShape(diseaseShape, color) {
    let shape = {
      diseaseShape: diseaseShape,
      diseaseColor: color,
      shapeInstance: new MaleShape(this.ctx, this)
    }
    this.shapes.push(shape)
    this.drawDiseaseShape();
  }
}
