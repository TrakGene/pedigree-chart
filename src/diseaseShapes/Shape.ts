import BasePedigree from "../pedigrees/BasePedigree";
import Camera from "../Camera";

export default abstract class Shape {
  protected ctx: CanvasRenderingContext2D;
  protected pedigree: BasePedigree;
  constructor(ctx, pedigree) {
    this.ctx = ctx;
    this.pedigree = pedigree;
  }
  abstract drawDot(color: string);
  abstract fillColor(color: string);
}