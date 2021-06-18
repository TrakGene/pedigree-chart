import { BasePedigree } from './Pedigree'
import EventBus from './EventBus'

interface PedigreeDragShape {
    pedigree: BasePedigree
    dragEnabled: Boolean
}

export class MouseEventsHandler {
    pedigreeDiagram: HTMLCanvasElement
    pedigrees: Array<PedigreeDragShape> = []
    mouseOffsetX = 0
    mouseOffsetY = 0
    lastCursorXPosition = 0
    lastCursorYPosition = 0
    scalingFactor = 1

    startPan = false
    lastCursorX = 0
    firstCursorX = 0
    lastCursorY = 0
    firstCursorY = 0

    offsetX = 0
    totalOffsetX = 0
    offsetY = 0
    totalOffsetY = 0



    constructor(diagram) {
        this.pedigreeDiagram = diagram
        this.initClickHandler()
        EventBus.on('scale', (scale)=>{
            this.scalingFactor = scale
        })
    }

    initClickHandler() {
        this.pedigreeDiagram.onmousedown = (e) => {
            this.handleMouseDown(e)
            this.startPan = true
            this.firstCursorX = e.clientX
            this.firstCursorY = e.clientY      
            console.log("first", this.firstCursorX)
        }
        this.pedigreeDiagram.onmousemove = (e) => {
            this.dragPedigree(e)
        }
        this.pedigreeDiagram.onmouseup = (e) => {
            this.startPan = false
            this.totalOffsetX += this.offsetX
            this.totalOffsetY += this.offsetY
            this.pedigrees.forEach((pedigree)=>{
                pedigree.dragEnabled = false
            })
        }
    }

    dragDiagram(e) {
        const offsetX = e.clientX - this.firstCursorX
        this.offsetX = offsetX
        const offsetY = e.clientY - this.firstCursorY
        this.offsetY = offsetY
        this.pedigreeDiagram.style.transform = `translate(${(this.totalOffsetX + this.offsetX)}px, ${(this.totalOffsetY + this.offsetY)}px)`
        EventBus.emit("redraw")
    }

    handleMouseDown(e) {
        const ctx = this.pedigreeDiagram.getContext('2d')
        const rect = this.pedigreeDiagram.getBoundingClientRect();
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top;
        this.pedigrees.forEach((pedigree)=>{
            pedigree.pedigree.initShape()
            if(ctx.isPointInPath(mouseX, mouseY)) {
                pedigree.dragEnabled = true
                this.mouseOffsetX = (mouseX/ctx.getTransform().a) - pedigree.pedigree.x
                this.mouseOffsetY = (mouseY/ctx.getTransform().a) - pedigree.pedigree.y
                EventBus.emit('redraw')
                EventBus.emit(`click${pedigree.pedigree.id}`)
            }
        })
    }
    dragPedigree(e) {
        const rect = this.pedigreeDiagram.getBoundingClientRect();
        const ctx = this.pedigreeDiagram.getContext('2d')
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        let woof = false
        this.pedigrees.forEach((pedigree)=>{
            if(pedigree.dragEnabled) {
                woof = true
                this.startPan = false
                // pedigree.pedigree.x = Math.round((mouseX - this.mouseOffsetX)/15)*15
                // pedigree.pedigree.y = Math.round((mouseY - this.mouseOffsetY)/15)*15
                pedigree.pedigree.x = (mouseX/ctx.getTransform().a) - this.mouseOffsetX
                pedigree.pedigree.y = (mouseY/ctx.getTransform().a) - this.mouseOffsetY
                EventBus.emit('redraw')
            }
        })
        if(!woof && this.startPan) {
            // this.dragDiagram(e)
            this.pedigrees.forEach((pedigree)=>{
                    // pedigree.pedigree.x = Math.round((mouseX - this.mouseOffsetX)/15)*15
                    // pedigree.pedigree.y = Math.round((mouseY - this.mouseOffsetY)/15)*15
                    const offsetX = e.clientX - this.firstCursorX
                    this.offsetX = offsetX
                    const offsetY = e.clientY - this.firstCursorY
                    this.offsetY = offsetY
                    // this.pedigreeDiagram.style.transform = `translate(${(this.totalOffsetX + this.offsetX)}px, ${(this.totalOffsetY + this.offsetY)}px)`
                    pedigree.pedigree.cameraOffsetX = this.totalOffsetX + offsetX
                    pedigree.pedigree.cameraOffsetY = this.totalOffsetY + offsetY
                    // pedigree.pedigree.y = (mouseY/ctx.getTransform().a) - this.mouseOffsetY
                    EventBus.emit('redraw')
            })
        }
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