export interface Pedigree {
    x: number
    y: number
    // abstract setDeceased()
    // abstract setPregnacy()
    // abstract initShape()
    draw()
    // abstract create()
}
export class MalePedigree implements Pedigree {
    canvasDiagram: HTMLCanvasElement
    config
    size = 100
    dragEnabled = false
    x = 0
    y = 0
    constructor(canvasDiagram, config) {
        this.canvasDiagram = canvasDiagram
        this.config = config
    }
    calculateMiddle() {
        return { 
            x: this.x + this.size/2,
            y: this.y + this.size/2
        }
    }
    draw() {
        const ctx = this.canvasDiagram.getContext('2d')
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.lineWidth = 5
        ctx.fill()
        ctx.stroke();
        ctx.closePath();
    }
    // updatePosition(x, y) {

    // }
}