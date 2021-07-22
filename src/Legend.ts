import camera from "./Camera";
import eventBus from "./EventBus";
import BasePedigree from "./pedigrees/BasePedigree";
import RenderEngine from "./RenderEngine";

interface item {
  pedigree: BasePedigree;
  diseaseLabel: string;
}

export default class LegendTable {
  private size: number;
  private backgroundColor: string;
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D;
  private items: item[] = [];
  private itemsPerRow: number;
  private renderEngine: RenderEngine;
  private longestStringLength: number;

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
  addItem(pedigree, disease) {
    const stringLen = this.ctx.measureText(disease).width
    if(stringLen > this.longestStringLength) {
      this.longestStringLength = stringLen
    }
    const legendPedigree = Object.assign(
      Object.create(Object.getPrototypeOf(pedigree)),
      pedigree
    );

    this.renderEngine.pedigrees.push(legendPedigree);
    legendPedigree.x = 600;
    legendPedigree.y = 40;
    legendPedigree.isInLegend = true;
    legendPedigree.shapes.forEach((shape) => {
      legendPedigree.addDiseaseShape(shape.diseaseShape, shape.diseaseColor);
    });
    eventBus.on("redraw", () => {
      this.ctx.fillText(
        disease,
        legendPedigree.x + 90 + camera.OffsetX,
        legendPedigree.calculateMiddle().y + camera.OffsetY
      );
    });
    this.items.push({
      pedigree: legendPedigree,
      diseaseLabel: disease,
    });
  }
}
