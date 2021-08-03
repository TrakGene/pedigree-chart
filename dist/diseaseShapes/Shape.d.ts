import BasePedigree from "../pedigrees/BasePedigree";
export default abstract class Shape {
    protected ctx: CanvasRenderingContext2D;
    protected pedigree: BasePedigree;
    constructor(ctx: any, pedigree: any);
    drawDot(color: string): void;
    fillColor(color: string): void;
    abstract fillFirstQuarterColor(color: string): any;
    abstract fillSecondQuarterColor(color: string): any;
    abstract fillThirdQuarterColor(color: string): any;
    abstract fillFourthQuarterColor(color: string): any;
}
