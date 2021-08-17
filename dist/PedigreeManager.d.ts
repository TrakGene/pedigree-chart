import RenderEngine from "./RenderEngine";
import BasePedigree from "./pedigrees/BasePedigree";
/**
 * Managing pedigrees stored in @class RenderEngine
 *
 * Allows adding new ones, deleting and drawing thier shapes
 */
export default class PedigreeManager {
    private ctx;
    private renderEngine;
    constructor(diagram: HTMLCanvasElement, renderEngine: RenderEngine);
    createPedigree(sex: string, x: number, y: number): BasePedigree;
    deletePedigree(id: number): void;
    drawPedigrees(): void;
}
