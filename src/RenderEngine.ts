import ConnectionManager from "./ConnectionsManager";
import PedigreeManager from "./PedigreeManager";
import EventBus from "./EventBus";
import DragHandler from "./DragHandler";
import BasePedigree from "./pedigrees/BasePedigree";
import LegendTable from "./Legend";
import eventBus from "./EventBus";

export default class RenderEngine {
  diagram: HTMLCanvasElement;
  diagramId: string;
  ctx: CanvasRenderingContext2D;
  diagramWrapper: HTMLElement;
  pedigrees: Array<BasePedigree> = [];
  config = {
    width: 1200,
    height: 600,
    dragEnabled: false,
    panEnabled: false,
    font: "16px Arial"
  }
  connectionManager: ConnectionManager;
  pedigreeManager: PedigreeManager;
  dragHandler: DragHandler;

  scaleFactor = 1;

  public setDiagram(diagramId: string) {
    this.diagramId = diagramId
    this.diagram = document.getElementById(diagramId) as HTMLCanvasElement;
    this.diagram.width = this.config.width
    this.diagram.height = this.config.height
    this.diagram.style.border = "4px solid black";
    this.diagram.style.overflow = "hidden";
    this.ctx = this.diagram.getContext("2d");
    this.ctx.font = this.config.font

    this.connectionManager = new ConnectionManager(this.diagram);
    this.pedigreeManager = new PedigreeManager(this.diagram, this);
    this.initEvents();
    setTimeout(() => this.draw());
  }
  private initEvents() {
    EventBus.on("redraw", () => this.draw());
    window.addEventListener("resize", () => {
      this.resizeDiagramWidth();
    });
    this.diagram.addEventListener("wheel", (event) => {
      this.scaleFactor += event.deltaY * 0.001;
      this.scale(event.deltaY * 0.001, event.clientX, event.clientY);
      event.preventDefault();
    });
  }
  private recreateDiagram() {
    this.diagram.width = this.config.width
    this.diagram.height = this.config.height
    this.ctx.font = this.config.font
    if(this.config.dragEnabled || this.config.panEnabled) {
      this.dragHandler = new DragHandler(this.diagram, this);
      this.config.dragEnabled ? this.dragHandler.dragEnabled = true : null
      this.config.panEnabled ? this.dragHandler.panEnabled = true : null
    }
    this.draw()
    this.resizeDiagramWidth();
  }
  private resizeDiagramWidth() {
    this.diagram.width = window.innerWidth;
    this.diagram.height = window.innerHeight;
    this.draw();
  }
  private draw() {
    this.ctx.clearRect(
      -10000,
      -10000,
      window.innerWidth * 1000,
      window.innerHeight * 1000
    );
    this.connectionManager.drawConnections();
    this.pedigreeManager.drawPedigrees();
  }
  public setConfig(configObject: any) {
    Object.keys(configObject).forEach(key=>{
      this.config[key] = configObject[key]
    })
    this.recreateDiagram()
  }
  public create(sex, x = 0, y = 0) {
    const pedigree = this.pedigreeManager.createPedigree(sex, x, y);
    return pedigree;
  }
  public connect(pedigreeA, pedigreeB, lineType) {
    if (lineType === "marriage" || lineType === "separation") {
      pedigreeA.marriagePartner = pedigreeB;
      pedigreeB.marriagePartner = pedigreeA;
    }
    this.connectionManager.createConnection(pedigreeA, pedigreeB, lineType);
  }
  public connectTwins(
    parent: BasePedigree,
    twinA: BasePedigree,
    twinB: BasePedigree,
    type
  ) {
    twinA.twin = twinB;
    twinB.twin = twinA;
    this.connectionManager.createTwinsConnection(parent, twinA, twinB, type);
  }
  public scale(scale, cursorX, cursorY) {
    this.scaleFactor = this.scaleFactor * (scale + 1);
    this.ctx.translate(cursorX, cursorY);
    this.ctx.scale(scale + 1, scale + 1);
    this.ctx.translate(-cursorX, -cursorY);
    setTimeout(() => eventBus.emit('redraw'));
  }
  public deletePedigree(id) {
    this.pedigreeManager.deletePedigree(id);
    this.connectionManager.removeConnection(id);
    setTimeout(() => {
      this.draw();
    });
  }
  public createLegend(x, y) {
    return new LegendTable(this.ctx, x, y)
  }
  public on(eventName: "pedigree-click", eventHandler) {
    EventBus.on(eventName, eventHandler);
  }
}
