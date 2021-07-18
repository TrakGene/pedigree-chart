import BasePedigree from "../pedigrees/BasePedigree";

export default abstract class Shape {
  protected ctx: CanvasRenderingContext2D;
  protected pedigree: BasePedigree;
  constructor(ctx, pedigree) {
    this.ctx = ctx;
    this.pedigree = pedigree;
  }
  abstract drawDot(color: string);
  abstract fillColor(color: string);
  abstract fillFirstQuarterColor(color: string);
  abstract fillSecondQuarterColor(color: string);
  abstract fillThirdQuarterColor(color: string);
  abstract fillFourthQuarterColor(color: string);
}