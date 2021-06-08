import { MalePedigree } from './Pedigree'
import { MouseEventsHandler } from "./DragHandler"
import ConnectionManager from "./ConnectionsManager"
import eventBus from './EventBus'
import PedigreeManager from "./PedigreeManager"

export default class RenderEngine {
    shapes = []
    diagram: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    dragHandler: MouseEventsHandler
    connectionManager: ConnectionManager
    pedigreeManager: PedigreeManager

    constructor(id) {
        this.diagram = document.getElementById(id) as HTMLCanvasElement;
        this.ctx = this.diagram.getContext('2d')
        this.dragHandler = new MouseEventsHandler(this.diagram, this.ctx)
        this.connectionManager = new ConnectionManager(this.diagram)
        this.pedigreeManager = new PedigreeManager(this.diagram)
        eventBus.on("redraw", () => this.draw())
    }
    private draw() {
        this.pedigreeManager.drawPedigrees()
        this.connectionManager.drawConnections()
    }
    public create(sex, type) {
        const pedigree = this.pedigreeManager.createPedigree(sex, type)
        return pedigree
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
}
