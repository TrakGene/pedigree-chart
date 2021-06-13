import { MouseEventsHandler } from "./DragHandler"
import ConnectionManager from "./ConnectionsManager"
import eventBus from './EventBus'
import PedigreeManager from "./PedigreeManager"

export default class RenderEngine {
    shapes = []
    diagram: HTMLCanvasElement
    diagramWrapper: HTMLElement
    // dragHandler: MouseEventsHandler
    connectionManager: ConnectionManager
    pedigreeManager: PedigreeManager

    constructor(id) {
        const diagramWrapper = document.getElementById(id) as HTMLElement;
        const diagram = document.createElement('canvas')
        diagram.width = window.innerWidth
        diagram.height = window.innerHeight
        diagramWrapper.style.border = "3px solid black"
        diagramWrapper.style.overflow = "hidden"
        diagramWrapper.appendChild(diagram)
        window.addEventListener("resize", ()=>{
            this.resizeDiagram()
        })
        this.diagram = diagram
        // this.dragHandler = new MouseEventsHandler(this.diagram)
        this.connectionManager = new ConnectionManager(this.diagram)
        this.pedigreeManager = new PedigreeManager(this.diagram)
        eventBus.on("redraw", () => this.draw())
        setTimeout(()=>{
            this.draw()
        }, 1)
    }
    private draw() {
        const ctx = this.diagram.getContext("2d")
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        this.connectionManager.drawConnections()
        this.pedigreeManager.drawPedigrees()
    }
    public create(sex, type) {
        const pedigree = this.pedigreeManager.createPedigree(sex, type)
        return pedigree
    }
    public deletePedigree(id) {
        this.pedigreeManager.deletePedigree(id)
        this.connectionManager.removeConnection(id)
        setTimeout(()=>{
            this.draw()
        })
    }
    public woof() {
        console.log("x")
    }
    public resizeDiagram() {
        this.diagram.width = window.innerWidth
        this.diagram.height = window.innerHeight
        this.pedigreeManager.drawPedigrees()
        this.connectionManager.drawConnections()
    }
    public connect(pedigreeA, pedigreeB, lineType) {
        if (lineType === "marriage") {
            pedigreeA.marriagePartner = pedigreeB
            pedigreeB.marriagePartner = pedigreeA
        }
        this.connectionManager.createConnection(
            pedigreeA,
            pedigreeB,
            lineType
        )
        this.connectionManager.drawConnections()
    }
    public scale(scale) {
        this.pedigreeManager.scalePedigrees(scale)
        this.connectionManager.scaleConnections(scale)
    }
}
