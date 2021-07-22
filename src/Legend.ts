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
  private itemsPerRow = 2;
  private renderEngine: RenderEngine;
  private longestStringLength = 0;
  private pedOffsetX = 0;
  private pedOffsetY = 0;

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
    this.pedOffsetX = x;
    this.pedOffsetY = y;
    ctx.rect(x, y, 0, 0);
  }
  private calculatePedigreePoisiton() {
    const length = this.items.length
    if(length === 0) return;
    if(length % this.itemsPerRow === 0) {
      this.pedOffsetX = this.x
      this.pedOffsetY += 100
    } else {
      this.pedOffsetX += 140+this.longestStringLength
    }

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
    this.calculatePedigreePoisiton()

    this.renderEngine.pedigrees.push(legendPedigree);
    console.log(this.pedOffsetX)
    legendPedigree.x = this.pedOffsetX
    legendPedigree.y = this.pedOffsetY
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
