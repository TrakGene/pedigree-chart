import BasePedigree from "./BasePedigree";
interface LabelData {
    value: string;
    order: number;
}
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
    setLabel(newData: LabelData[]): void;
}
export {};
