import Shape from "./Shape";
import Camera from "../Camera";

export default class MaleShape extends Shape {
  fillFirstQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(this.pedigree.x, this.pedigree.y, this.pedigree.size/2, this.pedigree.size/2)
    this.ctx.fillStyle = color
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillSecondQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(this.pedigree.x+this.pedigree.size/2, this.pedigree.y, this.pedigree.size/2, this.pedigree.size/2)
    this.ctx.fillStyle = color
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillThirdQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(this.pedigree.x, this.pedigree.y+this.pedigree.size/2, this.pedigree.size/2, this.pedigree.size/2)
    this.ctx.fillStyle = color
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillFourthQuarterColor(color: string) {
    this.ctx.beginPath();
    this.ctx.rect(this.pedigree.x+this.pedigree.size/2, this.pedigree.y+this.pedigree.size/2, this.pedigree.size/2, this.pedigree.size/2)
    this.ctx.fillStyle = color
    this.ctx.fill();
    this.ctx.closePath();
  }
}
