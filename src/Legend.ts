import camera from "./Camera";
import eventBus from "./EventBus";
import BasePedigree from "./pedigrees/BasePedigree";

interface item {
  pedigree: BasePedigree;
  diseaseLabel: string;
}

export default class LegendTable {
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D;
  private items: item[] = [];
  private itemsPerRow = 3;
  private longestStringLength = 0;
  private pedOffsetX = 0;
  private pedOffsetY = 0;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.pedOffsetX = x;
    this.pedOffsetY = y;
    eventBus.on("redraw", ()=>{
      this.drawLegendPedigrees()
      this.drawDiseaseLabels()
    })
  }
  private calculatePedigreePoisiton(itemIndex: number) {
    const length = this.items.length
    if(length === 0) return;
    if(itemIndex % this.itemsPerRow === 0) {
      this.pedOffsetX = this.x
      this.pedOffsetY += 100
    } else {
      this.pedOffsetX += 140 + this.longestStringLength
    }
  }
  private drawDiseaseLabels() {
    this.items.forEach((item)=>{
      this.ctx.fillText(
        item.diseaseLabel,
        item.pedigree.x + 90 + camera.OffsetX,
        item.pedigree.calculateMiddle().y + camera.OffsetY
      );
    })
  }
  private drawLegendPedigrees() {
    this.pedOffsetX = this.x
    this.pedOffsetY = this.y
    this.items.forEach((item, index)=>{
      this.calculatePedigreePoisiton(index)
      item.pedigree.x = this.pedOffsetX
      item.pedigree.y = this.pedOffsetY
      item.pedigree.draw()
    })
  }
  public setItemsPerRow(num: number) {
    this.itemsPerRow = num;
  }
  public setPedigree(pedigree, disease) {
    const stringLen = this.ctx.measureText(disease).width
    if(stringLen > this.longestStringLength) {
      this.longestStringLength = stringLen
    }
    const legendPedigree = Object.assign(
      Object.create(Object.getPrototypeOf(pedigree)),
      pedigree
    );

    legendPedigree.x = this.pedOffsetX
    legendPedigree.y = this.pedOffsetY
    legendPedigree.isInLegend = true;
    legendPedigree.shapes.forEach((shape) => {
      legendPedigree.addDiseaseShape(shape.diseaseShape, shape.diseaseColor);
    });
    this.items.push({
      pedigree: legendPedigree,
      diseaseLabel: disease,
    });
    setTimeout(()=>{eventBus.emit("redraw")}, 1)
  }
  public removePedigree(id: number) {
    this.items = this.items.filter(item=>item.pedigree.id !== id)
  }
}
