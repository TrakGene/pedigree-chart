export default class LegendTable {
    private x;
    private y;
    private ctx;
    private items;
    private itemsPerRow;
    private longestStringLength;
    private pedOffsetX;
    private pedOffsetY;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number);
    private calculatePedigreePoisiton;
    private drawDiseaseLabels;
    private drawLegendPedigrees;
    setItemsPerRow(num: number): void;
    addItem(pedigree: any, disease: any): void;
}
