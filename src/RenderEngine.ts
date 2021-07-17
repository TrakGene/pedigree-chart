import ConnectionManager from "./ConnectionsManager";
import PedigreeManager from "./PedigreeManager";
import EventBus from "./EventBus";
import DragHandler from "./DragHandler";
import BasePedigree from "./pedigrees/BasePedigree";

export default class RenderEngine {
    shapes = []
    diagram: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    diagramWrapper: HTMLElement
    pedigrees: Array<BasePedigree> = []

  connectionManager: ConnectionManager;
  pedigreeManager: PedigreeManager;
  dragHandler: DragHandler;

  scaleFactor = 1;

    constructor(id: string) {
        this.diagramWrapper = document.getElementById(id) as HTMLElement;
        this.diagram = document.createElement('canvas')
        this.ctx = this.diagram.getContext("2d")
        this.initDiagramEditor()
        this.initEvents()
        setTimeout(()=>this.draw())
    }

    private initDiagramEditor() {
        this.diagram.width = window.innerWidth
        this.diagram.height = window.innerHeight
        this.diagramWrapper.style.border = "3px solid black"
        this.diagramWrapper.style.overflow = "hidden"
        this.ctx.font = "16px Arial";
        this.diagramWrapper.appendChild(this.diagram)
        this.connectionManager = new ConnectionManager(this.diagram)
        this.pedigreeManager = new PedigreeManager(this.diagram, this)
        this.dragHandler = new DragHandler(this.diagram, this)
    }
    private initEvents() {
        EventBus.on("redraw", () => this.draw())
        window.addEventListener("resize", () => {
            this.resizeDiagramWidth()
        })
        this.diagram.addEventListener("wheel", (event)=>{
            this.scaleFactor += event.deltaY*0.001
            this.scale(event.deltaY*0.001, event.clientX, event.clientY)
            event.preventDefault()
        });
    }
    private resizeDiagramWidth() {
        this.diagram.width = window.innerWidth
        this.diagram.height = window.innerHeight
        this.draw()
    }
    private draw() {
        this.ctx.clearRect(-10000, -10000, window.innerWidth*1000, window.innerHeight*1000)
        this.connectionManager.drawConnections()
        this.pedigreeManager.drawPedigrees()
    }
    public create(sex, x = 0, y = 0) {
        const pedigree = this.pedigreeManager.createPedigree(sex, x, y)
        return pedigree
    }
    public connect(pedigreeA, pedigreeB, lineType) {
        if (lineType === "marriage" || lineType === "separation") {
            pedigreeA.marriagePartner = pedigreeB
            pedigreeB.marriagePartner = pedigreeA
        }
        this.connectionManager.createConnection(
            pedigreeA,
            pedigreeB,
            lineType
        )
    }
    public connectTwins(parent: BasePedigree, twinA: BasePedigree, twinB: BasePedigree, type) {
        twinA.twin = twinB;
        twinB.twin = twinA;
        this.connectionManager.createTwinsConnection(
            parent,
            twinA,
            twinB,
            type
        )
    }
    public scale(scale, cursorX, cursorY) {
        this.scaleFactor = this.scaleFactor * (scale+1)
        this.ctx.translate(cursorX, cursorY)
        this.ctx.scale((scale+1), (scale+1))
        this.ctx.translate(-cursorX, -cursorY)
        setTimeout(()=>this.draw())
    }
    public deletePedigree(id) {
        this.pedigreeManager.deletePedigree(id)
        this.connectionManager.removeConnection(id)
        setTimeout(() => {
            this.draw()
        })
    }
    public on(eventName: "pedigree-click", eventHandler) {
        EventBus.on(eventName, eventHandler)
    }
    public updatePedigree(id) {
        
    }
}
