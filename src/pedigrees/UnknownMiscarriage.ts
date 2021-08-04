import BasePedigree from "./BasePedigree";

export default class UnknownMiscarriage extends BasePedigree {
  initShape() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.getMidX(), this.getY() + 10);
    this.ctx.lineTo(this.getX() + this.size, this.getY() + this.size);
    this.ctx.lineTo(this.getX(), this.getY() + this.size);
    this.ctx.lineTo(this.getMidX(), this.getY() + 10);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
