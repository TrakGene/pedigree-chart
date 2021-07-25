import BasePedigree from "./BasePedigree";
export default class Label {
    private ctx;
    private pedigree;
    private labelData;
    private lineHeight;
    private offsetFromPedigree;
    constructor(ctx: CanvasRenderingContext2D, pedigree: BasePedigree);
    private longestString;
    private longestStringCenter;
    private calculateBackgroundHeight;
    drawLabel(): void;
    setLabel(newState: any): void;
}
