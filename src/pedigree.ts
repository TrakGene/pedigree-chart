import EventBus from './EventBus'
import IdGenerator from './IdGenerator'

export abstract class BasePedigree {
    canvasDiagram: HTMLCanvasElement
    isMarried = false
    marriagePartner = null;
    storage: any
    id = IdGenerator.randomId()
    size = 60
    border = 3
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
    on(eventName, eventHandler) {
        EventBus.on(
            `${eventName}${this.id}`, 
            ()=>eventHandler(this.id)
        )
    }
    abstract initShape()
}
export class UnknownPedigree extends BasePedigree {
    initShape() {
        const ctx = this.canvasDiagram.getContext('2d')
        ctx.beginPath();
        ctx.lineWidth = this.border
        ctx.strokeStyle = "black";
        const size2 = this.size/2
        ctx.moveTo(this.x, this.y+size2);
        ctx.lineTo(this.x+size2, this.y);
        ctx.lineTo(this.x+this.size, this.y+size2);
        ctx.lineTo(this.x+size2, this.y+this.size);
        ctx.lineTo(this.x, this.y+size2);
        ctx.stroke();   
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

export class MalePedigree extends BasePedigree {
    initShape() {
        const ctx = this.canvasDiagram.getContext('2d')
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.lineWidth = this.border
        ctx.strokeStyle = "black";
        ctx.stroke();   
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

export class FemalePedigree extends BasePedigree {
    initShape() {
        const ctx = this.canvasDiagram.getContext('2d')
        ctx.beginPath();
        ctx.arc(this.x + this.size/2, this.y+this.size/2, this.size/2, 0,2*Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.lineWidth = this.border-1
        ctx.strokeStyle = "black";
        ctx.stroke();   
        ctx.closePath();
    }
}