import { BasePedigree } from "./pedigrees/Pedigree";
import Camera from "./Camera";

export abstract class Shape {
  protected ctx: CanvasRenderingContext2D;
  protected pedigree: BasePedigree;
  constructor(ctx, pedigree) {
    this.ctx = ctx;
    this.pedigree = pedigree;
  }
  abstract drawDot(color: string);
  abstract fillColor();
}

export class FemaleShape extends Shape {
  drawDot(color: string) {
    const size = 15;
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
  fillColor() {}
}

export class MaleShape extends Shape {
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
  fillColor() {}
}

export class UnknownShape extends Shape {
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
  fillColor() {}
}
