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
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.lineWidth = this.border
        ctx.strokeStyle = "black";
        ctx.stroke();   
        ctx.closePath();
    }
    on(eventName, eventHandler) {
        EventBus.on(
            `${eventName}${this.id}`, 
            ()=>eventHandler(this.id)
        )
    }
}
export class FemalePedigree implements Pedigree {
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
        ctx.arc(this.x, this.y, this.size/2, 0,2*Math.PI);
        ctx.fillStyle = "#8ED6FF";
        ctx.fill();
        ctx.lineWidth = this.border
        ctx.strokeStyle = "black";
        ctx.stroke();   
        ctx.closePath();
    }
    on(eventName, eventHandler) {
        EventBus.on(
            `${eventName}${this.id}`, 
            ()=>eventHandler(this.id)
        )
    }
}