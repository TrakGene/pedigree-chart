import { Pedigree } from './Pedigree'
import EventBus from './EventBus'

interface PedigreeDragShape {
    pedigree: Pedigree
    dragEnabled: Boolean
}

export class MouseEventsHandler {
    pedigreeDiagram: HTMLCanvasElement
    pedigrees: Array<PedigreeDragShape> = []
    mouseOffsetX = 0
    mouseOffsetY = 0
    lastCursorXPosition = 0
    lastCursorYPosition = 0

    constructor(diagram) {
        this.pedigreeDiagram = diagram
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
        const ctx = this.pedigreeDiagram.getContext('2d')
        const rect = this.pedigreeDiagram.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.pedigrees.forEach((pedigree)=>{
            pedigree.pedigree.draw()
            if(ctx.isPointInPath(mouseX, mouseY)) {
                pedigree.dragEnabled = true
                this.mouseOffsetX = mouseX - pedigree.pedigree.x
                this.mouseOffsetY = mouseY - pedigree.pedigree.y
                EventBus.emit('redraw')
                EventBus.emit(`click${pedigree.pedigree.id}`)
            }
        })
    }
    dragPedigree(e) {
        const rect = this.pedigreeDiagram.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.pedigrees.forEach((pedigree)=>{
            if(pedigree.dragEnabled) {
                pedigree.pedigree.x = Math.round((mouseX - this.mouseOffsetX)/15)*15
                pedigree.pedigree.y = Math.round((mouseY - this.mouseOffsetY)/15)*15
                // pedigree.pedigree.x = mouseX - this.mouseOffsetX
                // pedigree.pedigree.y = mouseY - this.mouseOffsetY
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
    deletePedigree(id) {
        for (let index = 0; index < this.pedigrees.length; index++) {
            const element = this.pedigrees[index].pedigree;
            if(id === element.id) {
                this.pedigrees.splice(index, 1)
            }
        }
    }
}