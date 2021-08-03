import Shape from "./Shape";
import Camera from "../Camera";

export default class UnknownShape extends Shape {
  fillFirstQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.pedigree.getX(), this.pedigree.getMidY());
    this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getY());
    this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getMidY());
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillSecondQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.pedigree.getMidX(), this.pedigree.getMidY());
    this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getY());
    this.ctx.lineTo(
      this.pedigree.getX() + this.pedigree.size,
      this.pedigree.getMidY()
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillThirdQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.pedigree.getX() + this.pedigree.size,
      this.pedigree.getMidY()
    );
    this.ctx.lineTo(
      this.pedigree.getMidX(),
      this.pedigree.getY() + this.pedigree.size,
    );
    this.ctx.lineTo(
      this.pedigree.getMidX(),
      this.pedigree.getMidY()
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillFourthQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.pedigree.getX(),
      this.pedigree.getMidY()
    );
    this.ctx.lineTo(
      this.pedigree.getMidX(),
      this.pedigree.getY()+ this.pedigree.size
    );
    this.ctx.lineTo(
      this.pedigree.getMidX(),
      this.pedigree.getMidY()
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
