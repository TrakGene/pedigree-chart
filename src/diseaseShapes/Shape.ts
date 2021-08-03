import BasePedigree from "../pedigrees/BasePedigree";

export default abstract class Shape {
  protected ctx: CanvasRenderingContext2D;
  protected pedigree: BasePedigree;
  constructor(ctx, pedigree) {
    this.ctx = ctx;
    this.pedigree = pedigree;
  }
  drawDot(color: string) {
    const size = 16;
    this.ctx.beginPath();
    this.ctx.arc(
      this.pedigree.getMidX(),
      this.pedigree.getMidY(),
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
  abstract fillFirstQuarterColor(color: string);
  abstract fillSecondQuarterColor(color: string);
  abstract fillThirdQuarterColor(color: string);
  abstract fillFourthQuarterColor(color: string);
}