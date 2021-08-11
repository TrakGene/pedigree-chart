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
  pedigrees: Array<BasePedigree> = [];
  config = {
    width: 1200,
    height: 600,
    dragEnabled: false,
    panEnabled: false,
    scaleType: "none",
    minScale: 0.5,
    maxScale: 2,
    font: "16px Arial",
  };
  connectionManager: ConnectionManager;
  pedigreeManager: PedigreeManager;
  dragHandler: DragHandler;

  scaleFactor = 1;

  private recreateDiagram() {
    this.diagram.width = this.config.width;
    this.diagram.height = this.config.height;
    this.ctx.font = this.config.font;
    this.dragHandler = new DragHandler(this.diagram, this);

    if (this.config.dragEnabled || this.config.panEnabled) {
      this.config.dragEnabled ? (this.dragHandler.dragEnabled = true) : null;
      this.config.panEnabled ? (this.dragHandler.panEnabled = true) : null;
    }
    if (this.config.scaleType === "none") return;
    if (this.config.scaleType === "pointer") this.scaleWithPointer();
    if (this.config.scaleType === "scroll") this.scaleWithScroll();
    this.draw();
  }
  private scaleWithScroll() {
    this.diagram.addEventListener("wheel", (event) => {
      if (this.scaleFactor > this.config.maxScale) {
        if (event.deltaY > 0) return;
        if (event.deltaY < 0) this.scaleFactor += event.deltaY * 0.001;
      }
      if (this.scaleFactor < this.config.minScale) {
        if (event.deltaY < 0) return;
        if (event.deltaY > 0) this.scaleFactor += event.deltaY * 0.001;
      }
      this.scale(event.deltaY * 0.001, 0, 0);
      event.preventDefault();
    });
  }
  private scaleWithPointer() {
    this.diagram.addEventListener("wheel", (event) => {
      if (this.scaleFactor > this.config.maxScale) {
        if (event.deltaY > 0) return;
        if (event.deltaY < 0) this.scaleFactor += event.deltaY * 0.001;
      }
      if (this.scaleFactor < this.config.minScale) {
        if (event.deltaY < 0) return;
        if (event.deltaY > 0) this.scaleFactor += event.deltaY * 0.001;
      }
      this.scale(event.deltaY * 0.001, event.clientX, event.clientY);
      event.preventDefault();
    });
  }
  private scale(scale, cursorX, cursorY) {
    this.scaleFactor = this.scaleFactor * (scale + 1);
    this.ctx.translate(cursorX, cursorY);
    this.ctx.scale(scale + 1, scale + 1);
    this.ctx.translate(-cursorX, -cursorY);
    setTimeout(() => eventBus.emit("redraw"));
  }
  private draw() {
    this.ctx.clearRect(
      0,
      0,
      this.config.width * this.config.maxScale,
      this.config.height * this.config.maxScale
    );
    this.connectionManager.drawConnections();
    this.pedigreeManager.drawPedigrees();
  }
  public setDiagram(diagramId: string) {
    this.diagramId = diagramId;
    this.diagram = document.getElementById(diagramId) as HTMLCanvasElement;
    this.diagram.width = this.config.width;
    this.diagram.height = this.config.height;
    this.diagram.style.border = "4px solid black";
    this.diagram.style.overflow = "hidden";
    this.ctx = this.diagram.getContext("2d");
    this.ctx.font = this.config.font;
    this.connectionManager = new ConnectionManager(this.diagram);
    this.pedigreeManager = new PedigreeManager(this.diagram, this);
    EventBus.on("redraw", () => this.draw());
    EventBus.emit("redraw");
  }
  public setConfig(configObject: any) {
    Object.keys(configObject).forEach((key) => {
      this.config[key] = configObject[key];
    });
    this.recreateDiagram();
  }
  public create(sex, x = 0, y = 0) {
    const pedigree = this.pedigreeManager.createPedigree(sex, x, y);
    return pedigree;
  }
  public connect(
    pedigreeA: BasePedigree,
    pedigreeB: BasePedigree,
    lineType: string
  ) {
    if (lineType === "partnership" || lineType === "separation") {
      pedigreeA.marriagePartner = pedigreeB;
      pedigreeB.marriagePartner = pedigreeA;
    }
    this.connectionManager.createConnection(pedigreeA, pedigreeB, lineType);
    EventBus.emit("redraw");
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
    EventBus.emit("redraw");
  }
  public delete(id: number) {
    this.pedigrees = this.pedigrees.filter((pedigree) => pedigree.id !== id);
    this.pedigreeManager.deletePedigree(id);
    this.connectionManager.removeConnection(id);
    EventBus.emit("redraw");
  }
  public replace(id: number, newPedigree: BasePedigree) {
    const index = this.pedigrees.findIndex((pedigree) => pedigree.id === id);
    if (index >= 0) {
      const connectionsToReplace = this.connectionManager.getConnections(id);
      const twinConnectionsToReplace =
        this.connectionManager.getTwinsConnections(id);
      this.connectionManager.removeConnection(id);
      connectionsToReplace.forEach((connection) => {
        if (connection.pedigreeA.id === id) {
          this.connect(newPedigree, connection.pedigreeB, connection.type);
        }
        if (connection.pedigreeB.id === id) {
          this.connect(connection.pedigreeA, newPedigree, connection.type);
        }
      });
      twinConnectionsToReplace.forEach((connection) => {
        if (connection.twinA.id === id) {
          this.connectTwins(
            newPedigree,
            connection.twinB,
            connection.parent,
            connection.type
          );
        }
        if (connection.twinB.id === id) {
          this.connectTwins(
            connection.twinA,
            newPedigree,
            connection.parent,
            connection.type
          );
        }
        if (connection.parent.id === id) {
          this.connectTwins(
            connection.twinA,
            connection.twinB,
            newPedigree,
            connection.type
          );
        }
      });
      this.pedigrees = this.pedigrees.filter((pedigree) => pedigree.id !== id);
      this.pedigreeManager.deletePedigree(id);
      newPedigree.id = id;
      this.pedigrees.push(newPedigree);
    }
    EventBus.emit("redraw");
  }
  public createLegend(x: number, y: number) {
    return new LegendTable(this.ctx, x, y);
  }
  public on(eventName: "pedigree-click", eventHandler) {
    EventBus.on(eventName, eventHandler);
  }
  public remove(eventName: string) {
    EventBus.remove(eventName);
  }
}
