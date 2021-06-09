import EventBus from './EventBus'
import IdGenerator from './IdGenerator'

export interface Pedigree {
    id: string
    isMarried: boolean
    marriagePartner: Pedigree
    size: number
    border: number
    x: number
    y: number
    draw()
    initShape()
    calculateMiddle()
}
export class MalePedigree implements Pedigree {
    canvasDiagram: HTMLCanvasElement
    isMarried = false
    marriagePartner = null;
    id = IdGenerator.randomId()
    size = 80
    border = 4
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
        ctx.lineWidth = this.border
        ctx.stroke();
        ctx.fillText(this.id, this.x, this.y);
        ctx.closePath();
    }
    initShape() {
        const ctx = this.canvasDiagram.getContext('2d')
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.lineWidth = this.border
        ctx.stroke();
        ctx.fillText(this.id, this.x, this.y);
        ctx.closePath();
    }
    on(eventName, eventHandler) {
        EventBus.on(
            `${eventName}${this.id}`, 
            ()=>eventHandler(this.id)
        )
    }
}