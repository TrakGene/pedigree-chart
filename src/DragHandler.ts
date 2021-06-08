import { Pedigree } from './Pedigree'
import EventBus from './EventBus'

interface PedigreeDragShape {
    pedigree: Pedigree
    dragEnabled: Boolean
}

export class MouseEventsHandler {
    pedigreeDiagram: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    pedigrees: Array<PedigreeDragShape> = []
    mouseOffsetX = 0
    mouseOffsetY = 0

    constructor(diagram, ctx) {
        this.pedigreeDiagram = diagram
        this.ctx = ctx
        this.initClickHandler()
    }

    initClickHandler() {
        this.pedigreeDiagram.onmousedown = (e) => {
            this.handleMouseDown(e)
        }
        this.pedigreeDiagram.onmousemove = (e) => {
            this.dragPedigree(e)
        }
        this.pedigreeDiagram.onmouseup = (e) => {
            this.pedigrees.forEach((pedigree)=>{
                pedigree.dragEnabled = false
            })
        }
    }

    handleMouseDown(e) {
        const rect = this.pedigreeDiagram.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.pedigrees.forEach((pedigree)=>{
            pedigree.pedigree.initShape()
            if(this.ctx.isPointInPath(mouseX, mouseY)) {
                pedigree.dragEnabled = true
                EventBus.emit(`click${pedigree.pedigree.id}`)
                this.mouseOffsetX = mouseX - pedigree.pedigree.x
                this.mouseOffsetY = mouseY - pedigree.pedigree.y
            }
        })
    }
    dragPedigree(e) {
        const rect = this.pedigreeDiagram.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.pedigrees.forEach((pedigree)=>{
            if(pedigree.dragEnabled) {
                pedigree.pedigree.x = mouseX - this.mouseOffsetX
                pedigree.pedigree.y = mouseY - this.mouseOffsetY
                EventBus.emit('redraw')
            }
        })
    }
    appendPedigrees(pedigree) {
        this.pedigrees.push({
            pedigree: pedigree,
            dragEnabled: false
        })
    }
}