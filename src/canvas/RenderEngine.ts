import { MalePedigree } from './Pedigree'
import { MouseEventsHandler } from "./DragHandler"
import LinesRenderer from "./LinesRenderer"
import eventBus from './EventBus'

export default class RenderEngine {
    shapes = []
    connections = [{
        type: "x",

    }]
    diagram
    dragHandler: MouseEventsHandler
    lineRenderer: LinesRenderer

    constructor(id) {
        this.diagram = document.getElementById(id);
        this.dragHandler = new MouseEventsHandler(this.diagram)
        this.lineRenderer = new LinesRenderer(this.diagram)
        eventBus.on("redraw", ()=>this.draw())
    }
    create(sex, type) {
        let pedigree;
        switch(sex) {
            case "male": pedigree = new MalePedigree(this.diagram)
        }
        this.shapes.push(pedigree)
        this.dragHandler.appendPedigrees(pedigree)
        this.draw()
        return pedigree
    }
    draw() {
        const ctx = this.diagram.getContext('2d')
        ctx.clearRect(0, 0, 1000, 1000)
        this.shapes.forEach(shape => {
            shape.draw()
        })
    }
}
    // renderLines() {
    //     this.ctx.beginPath();
    //     var ctx = this.diagram.getContext("2d");
    //     ctx.moveTo(this.shapes[1].calculateMiddle().x, this.shapes[1].calculateMiddle().y);
    //     ctx.lineTo(this.shapes[2].calculateMiddle().x, this.shapes[2].calculateMiddle().y);
    //     ctx.lineWidth = 3
    //     ctx.stroke();
    // }