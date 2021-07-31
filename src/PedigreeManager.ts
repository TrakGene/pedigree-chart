import RenderEngine from "./RenderEngine";
import MalePedigree from "./pedigrees/MalePedigree";
import FemalePedigree from "./pedigrees/FemalePedigree";
import UnknownPedigree from "./pedigrees/UnknownPedigree";
import BasePedigree from "./pedigrees/BasePedigree";

export default class PedigreeManager {
  private ctx: CanvasRenderingContext2D;
  private renderEngine: RenderEngine;

  constructor(diagram: HTMLCanvasElement, renderEngine: RenderEngine) {
    this.renderEngine = renderEngine;
    this.ctx = diagram.getContext("2d");
  }

  createPedigree(
    sex: string,
    x: number,
    y: number
  ): BasePedigree {
    let pedigree;
    switch (sex) {
      case "male":
        pedigree = new MalePedigree(this.ctx, x, y);
        break;
      case "female":
        pedigree = new FemalePedigree(this.ctx, x, y);
        break;
      case "unknown":
        pedigree = new UnknownPedigree(this.ctx, x, y);
        break;
    }
    this.renderEngine.pedigrees.push(pedigree);
    return pedigree;
  }

  deletePedigree(id: string): void {
    const len = this.renderEngine.pedigrees.length;
    for (let i = 0; i < len; i++) {
      const element = this.renderEngine.pedigrees[i];
      if (id === element.id) {
        this.renderEngine.pedigrees.splice(i, 1);
      }
    }
  }

  drawPedigrees(): void {
    this.renderEngine.pedigrees.forEach((pedigree) => {
      pedigree.draw();
    });
  }
}
