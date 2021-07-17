import Shape from "./Shape";
import Camera from "../Camera";

export default class MaleShape extends Shape {
  drawDot(color: string) {
    const size = 16;
    this.ctx.beginPath();
    this.ctx.arc(
      this.pedigree.x + this.pedigree.size / 2 + Camera.OffsetX,
      this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY,
      size / 2,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillColor(color: string) {
    this.pedigree.fillColor = color
  }
  fillFirstQuaterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(this.pedigree.x, this.pedigree.y, this.pedigree.size/2, this.pedigree.size/2)
    this.ctx.fillStyle = color
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillSecondQuaterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(this.pedigree.x+this.pedigree.size/2, this.pedigree.y, this.pedigree.size/2, this.pedigree.size/2)
    this.ctx.fillStyle = color
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillThirdQuaterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(this.pedigree.x, this.pedigree.y+this.pedigree.size/2, this.pedigree.size/2, this.pedigree.size/2)
    this.ctx.fillStyle = color
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillFourthQuaterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(this.pedigree.x+this.pedigree.size/2, this.pedigree.y+this.pedigree.size/2, this.pedigree.size/2, this.pedigree.size/2)
    this.ctx.fillStyle = color
    this.ctx.fill();
    this.ctx.closePath();
  }
}
