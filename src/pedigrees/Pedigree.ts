import Camera from "../Camera";
import { BasePedigree } from "./BasePedigree";
import { FemaleShape, MaleShape, UnknownShape } from "../Shapes";


export class UnknownPedigree extends BasePedigree {
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
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawPedigree() {
    this.initShape();
    this.label.drawLabel();
    this.drawDiseaseShape();
  }
  setDiseaseShape(shape, color) {
    this.diseaseShape = shape;
    this.diseaseColor = color;
    this.shape = new UnknownShape(this.ctx, this);
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

export class MalePedigree extends BasePedigree {
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

export class FemalePedigree extends BasePedigree {
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
    this.shape = new FemaleShape(this.ctx, this);
    this.drawDiseaseShape()
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
