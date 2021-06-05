import EventBus from './EventBus'

export interface Pedigree {
    x: number
    y: number
    // abstract setDeceased()
    // abstract setPregnacy()
    // abstract initShape()
    draw()
    calculateMiddle()
}
export class MalePedigree implements Pedigree {
    canvasDiagram: HTMLCanvasElement
    size = 100
    x = 0
    y = 0
    constructor(canvasDiagram) {
        this.canvasDiagram = canvasDiagram
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
        ctx.lineWidth = 4
        ctx.stroke();
        ctx.closePath();
    }
    on(eventName, eventHandler) {
        EventBus.on(eventName, ()=>eventHandler(this.size))
    }
}