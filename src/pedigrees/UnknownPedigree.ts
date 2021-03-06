import BasePedigree from "./BasePedigree";
import Camera from "../Camera";
import UnknownShape from "../diseaseShapes/UnknownShapes";

export default class UnknownPedigree extends BasePedigree {
  initShape() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.border;
    this.ctx.strokeStyle = "black";
    const size2 = this.size / 2;
    this.ctx.moveTo(this.x + Camera.OffsetX, this.y + size2 + Camera.OffsetY);
    this.ctx.lineTo(this.x + size2 + Camera.OffsetX, this.y + Camera.OffsetY);
    this.ctx.lineTo(
      this.x + this.size + Camera.OffsetX,
      this.y + size2 + Camera.OffsetY
    );
    this.ctx.lineTo(
      this.x + size2 + Camera.OffsetX,
      this.y + this.size + Camera.OffsetY
    );
    this.ctx.lineTo(this.x + Camera.OffsetX, this.y + size2 + Camera.OffsetY);
    this.ctx.stroke();
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
    this.ctx.closePath();
  }
  addDiseaseShape(diseaseShape, color) {
    let shape = {
      diseaseShape: diseaseShape,
      diseaseColor: color,
      shapeInstance: new UnknownShape(this.ctx, this)
    }
    this.shapes.push(shape)
    this.drawDiseaseShape();
  }
}
