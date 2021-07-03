import EventBus from './EventBus'
import IdGenerator from './IdGenerator'
import Camera from './Camera'

export abstract class BasePedigree {
    canvasDiagram: HTMLCanvasElement
    isMarried = false
    marriagePartner = null;
    twin = null;
    storage: any
    id = IdGenerator.randomId()
    size = 60
    border = 3
    x = 0
    y = 0
    scalingFactor = 1
    dragEnabled = false
    constructor(canvasDiagram, x, y) {
        this.canvasDiagram = canvasDiagram
        this.x = x
        this.y = y
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
        ctx.moveTo(this.x + Camera.OffsetX, this.y+size2+Camera.OffsetY);
        ctx.lineTo(this.x+size2 + Camera.OffsetX, this.y+Camera.OffsetY);
        ctx.lineTo(this.x+this.size + Camera.OffsetX, this.y+size2+Camera.OffsetY);
        ctx.lineTo(this.x+size2 + Camera.OffsetX, this.y+this.size+Camera.OffsetY);
        ctx.lineTo(this.x + Camera.OffsetX, this.y+size2+Camera.OffsetY);
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
        ctx.rect(this.x + Camera.OffsetX, this.y + Camera.OffsetY, this.size, this.size);
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
        ctx.arc((this.x + this.size/2)+ Camera.OffsetX, (this.y+this.size/2)+Camera.OffsetY, this.size/2, 0,2*Math.PI);
        ctx.scale(this.scalingFactor, this.scalingFactor)
        ctx.lineWidth = this.border
        ctx.strokeStyle = "black";
        ctx.stroke();   
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}