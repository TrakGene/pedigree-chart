import { MalePedigree } from './Pedigree'
import { MouseEventsHandler } from "./DragHandler"
import ConnectionManager from "./ConnectionManager"
import eventBus from './EventBus'

export default class RenderEngine {
    shapes = []
    diagram
    dragHandler: MouseEventsHandler
    connectionManager: ConnectionManager
    newx = 0

    constructor(id) {
        this.diagram = document.getElementById(id);
        this.dragHandler = new MouseEventsHandler(this.diagram)
        this.connectionManager = new ConnectionManager(this.diagram)
        eventBus.on("redraw", ()=>this.draw())
    }
    create(sex, type) {
        let pedigree;
        switch(sex) {
            case "male": pedigree = new MalePedigree(this.diagram)
        }
        pedigree.x = this.newx
        this.newx = this.newx + 120
        this.shapes.push(pedigree)
        this.dragHandler.appendPedigrees(pedigree)
        this.draw()
        return pedigree
    }
    connect(pedigreeA, pedigreeB, lineType) {
        if(lineType === "marriage") {
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
    draw() {
        const ctx = this.diagram.getContext('2d')
        ctx.clearRect(0, 0, 1000, 1000)
        this.shapes.forEach(shape => {
            shape.draw()
        })
        this.connectionManager.drawConnections()
    }
    resize() {
        this.shapes.forEach(shape => {
            shape.size = shape.size * 0.5
            shape.border = shape.border * 0.5
        })
        this.draw()
    }
}
