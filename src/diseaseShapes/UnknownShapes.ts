import Shape from "./Shape";
import Camera from "../Camera";

export default class UnknownShape extends Shape {
  fillFirstQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.pedigree.x + Camera.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY);
    this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera.OffsetX, this.pedigree.y + Camera.OffsetY);
    this.ctx.lineTo(
      this.pedigree.x + this.pedigree.size / 2 + Camera.OffsetX,
      this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillSecondQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.pedigree.x + this.pedigree.size/2 + Camera.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY);
    this.ctx.lineTo(this.pedigree.x + this.pedigree.size/2 + Camera.OffsetX, this.pedigree.y + Camera.OffsetY);
    this.ctx.lineTo(
      this.pedigree.x + this.pedigree.size + Camera.OffsetX,
      this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillThirdQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.pedigree.x + this.pedigree.size + Camera.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY);
    this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera.OffsetX, this.pedigree.y + this.pedigree.size + Camera.OffsetY);
    this.ctx.lineTo(
      this.pedigree.x + this.pedigree.size / 2 + Camera.OffsetX,
      this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillFourthQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.pedigree.x + Camera.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY);
    this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera.OffsetX, this.pedigree.y + this.pedigree.size + Camera.OffsetY);
    this.ctx.lineTo(
      this.pedigree.x + this.pedigree.size / 2 + Camera.OffsetX,
      this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
