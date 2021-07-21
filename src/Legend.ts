import BasePedigree from "./pedigrees/BasePedigree";
import RenderEngine from "./RenderEngine";

export default class LegendTable {
  private size: number;
  private backgroundColor: string;
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D;
  private items: BasePedigree[] = [];
  private itemsPerRow: number;
  private renderEngine: RenderEngine;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    renderEngine: RenderEngine
  ) {
    this.ctx = ctx;
    this.renderEngine = renderEngine;
    this.x = x;
    this.y = y;
    ctx.rect(x, y, 0, 0);
  }
  setItemsPerRow(num: number) {
    this.itemsPerRow = num;
  }
  setBackgroundColor(color: string) {
    this.backgroundColor = color;
  }
  addPedigree(pedigree, disease) {
    const legendPedigree = Object.assign(
      Object.create(Object.getPrototypeOf(pedigree)),
      pedigree
    );

    this.renderEngine.pedigrees.push(legendPedigree);
    legendPedigree.x = 600;
    legendPedigree.y = 40;
    legendPedigree.isInLegend = true;
    legendPedigree.shapes.forEach((shape)=>{
        legendPedigree.addDiseaseShape(shape.diseaseShape, shape.diseaseColor)
    })
    this.items.push(legendPedigree);
    console.log(this.items);
    console.log(pedigree);
  }
}
