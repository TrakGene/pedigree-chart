import Shape from "./Shape";

export default class MaleShape extends Shape {
  fillFirstQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(
      this.pedigree.getX(),
      this.pedigree.getY(),
      this.pedigree.size / 2,
      this.pedigree.size / 2
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillSecondQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(
      this.pedigree.getMidX(),
      this.pedigree.getY(),
      this.pedigree.size / 2,
      this.pedigree.size / 2
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillThirdQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(
      this.pedigree.getX(),
      this.pedigree.getMidY(),
      this.pedigree.size / 2,
      this.pedigree.size / 2
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillFourthQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(
      this.pedigree.getMidX(),
      this.pedigree.getMidY(),
      this.pedigree.size / 2,
      this.pedigree.size / 2
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
