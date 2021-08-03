import RenderEngine from "./RenderEngine";
import BasePedigree from "./pedigrees/BasePedigree";
export default class PedigreeManager {
    private ctx;
    private renderEngine;
    constructor(diagram: HTMLCanvasElement, renderEngine: RenderEngine);
    createPedigree(sex: string, x: number, y: number): BasePedigree;
    deletePedigree(id: number): void;
    drawPedigrees(): void;
}
