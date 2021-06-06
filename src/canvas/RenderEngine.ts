import { MalePedigree } from './Pedigree'
import { MouseEventsHandler } from "./DragHandler"
import ConnectionCreator from "./LinesRenderer"
import eventBus from './EventBus'

export default class RenderEngine {
    shapes = []
    diagram
    dragHandler: MouseEventsHandler
    connectionCreator: ConnectionCreator
    newx = 0

    constructor(id) {
        this.diagram = document.getElementById(id);
        this.dragHandler = new MouseEventsHandler(this.diagram)
        this.connectionCreator = new ConnectionCreator(this.diagram)
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
        this.connectionCreator.createConnection(
            pedigreeA,
            pedigreeB,
            lineType
        )
        this.connectionCreator.drawConnections()
    }
    draw() {
        const ctx = this.diagram.getContext('2d')
        ctx.clearRect(0, 0, 1000, 1000)
        this.shapes.forEach(shape => {
            shape.draw()
        })
        this.connectionCreator.drawConnections()
    }
}
