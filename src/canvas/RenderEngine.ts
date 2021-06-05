import { MalePedigree } from './Pedigree'
import { MouseEventsHandler } from "./DragHandler"

export default class Engine {
    shapes = []
    diagram
    ctx
    offsetX = 0
    offsetY = 0
    marriageLines = []
    dragHandler: MouseEventsHandler
    constructor(id) {
        this.diagram = document.getElementById(id);
        this.ctx = this.diagram.getContext("2d");
        this.dragHandler = new MouseEventsHandler(this.diagram)
    }
    add() {
        const x = new MalePedigree(this.diagram, {})
        this.shapes.push(x)
        this.dragHandler.appendPedigrees(x)
        this.draw()
    }
    draw() {
        this.ctx.clearRect(0, 0, 1000, 1000)
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